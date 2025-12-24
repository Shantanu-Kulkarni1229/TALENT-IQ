import dotenv from 'dotenv';

dotenv.config({
    quiet: true
});

export const ENV = {
<<<<<<< HEAD
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL ,
    CLIENT_URL: process.env.CLIENT_URL ,
    NODE_ENV: process.env.NODE_ENV,
=======
    PORT : process.env.PORT || 3000,
    NODE_ENV : process.env.NODE_ENV || 'development',
    DB_URL : process.env.DB_URL,
    CLIENT_URL: process.env.CLIENT_URL,
>>>>>>> a0055a6fb31b0d51a114e974b8304ffa36a99dd5
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
}