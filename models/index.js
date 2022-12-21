const mongoose = require('mongoose');
const dbname = 'onepress'
const connect = () => {
    mongoose.connect(process.env.MONGO_URL_2,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ).catch((err) => console.log(err));
  }
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error", err);
  });
  module.exports = connect;