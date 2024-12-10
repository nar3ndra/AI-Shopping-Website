const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectDatabase = async (url) => {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server`);
    });
};

module.exports = connectDatabase;
