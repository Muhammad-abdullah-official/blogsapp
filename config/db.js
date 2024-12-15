import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const url = process.env.MONGO_URL;
    const connDb = await mongoose.connect(url);
    console.log(`Database connected: ${connDb.connection.host}`);
  } catch (error) {
    console.log(`Error connecting DataBase: ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
