const mongoose = require("mongoose");

const mongo_URI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
