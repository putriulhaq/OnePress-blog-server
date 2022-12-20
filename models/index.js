const mongoose = require('mongoose');
const dbname = 'onepress'
const connect = () => {

    // mongoose.connect('mongodb://localhost:27017/onepress',
    mongoose.connect(`mongodb+srv://putriulhaq:Bismillahsukses06@cluster0.b4p9mwv.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    // mongoose.connect(`mongodb+srv://reyvidod:rRey27AUG03_@scc.3tv5tm0.mongodb.net/${dbname}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
      }
    ).catch((err) => console.log(err));
  }
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error", err);
  });
  module.exports = connect;