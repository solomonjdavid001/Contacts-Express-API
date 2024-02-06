const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(
      `Connected to MongoDB!\nHost: ${connectionInstance.connection.host} \nDatabase: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
