const { Inngest } = require("inngest");
const { connectDB } = require("./db.js");
const User = require("../models/User.js");

const inngest = new Inngest({
  id: "talent-iq",
});

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    await User.create({
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url,
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    await User.deleteOne({ clerkId: event.data.id });
  }
);

module.exports = {
  inngest,
  functions: [syncUser, deleteUserFromDB],
};
