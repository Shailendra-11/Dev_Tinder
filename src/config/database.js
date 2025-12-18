const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MOGOONSE_LINK);
    console.log("✅ Database connect successful");
  } catch (error) {
    console.error("❌ Database connect failed:", error.message);
  }
};

 module.exports= connectDB;
