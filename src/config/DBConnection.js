import mongoose from "mongoose";
const DatabaseConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    if (db) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.log(`DataBase Connection error : ${error.message}`);

    throw Error;
  }
};

export default DatabaseConnect;
