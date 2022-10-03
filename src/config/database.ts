const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;

exports.connect = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🏪[Database]: DB CONNECTED SUCCESSFULLY`);
  } catch (error) {
    console.log(`🏪[Database]: DB connection failed`);
    console.error(error);
    process.exit(1);
  }
};
