import mongoose from 'mongoose';

export const mongoDB = async () => {
  return mongoose
    .connect(
      process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV,
      {
        dbName: 'Developement', // Always change this to Development when working in development mode
        // process.env.NODE_ENV === "production" ? "Production" : "Development",
      }
    )
    .then(() => {
      console.log('MongoDB Connected Successfully');
    })
    .catch((error) => console.log('MongoDB Disconnected', error));
};
