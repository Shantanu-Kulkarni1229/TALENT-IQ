import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "talent-iq",
});

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    await step.run("connect-to-database", async () => {
      await connectDB();
    });

    await step.run("create-user", async () => {
      const { id, email_addresses, first_name, last_name, image_url } = event.data;

      await User.create({
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        profileImage: image_url,
      });
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    await step.run("connect-to-database", async () => {
      await connectDB();
    });

    await step.run("delete-user", async () => {
      await User.deleteOne({ clerkId: event.data.id });
    });
  }
);

export const functions = [syncUser, deleteUserFromDB];
