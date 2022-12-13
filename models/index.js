const mongoose = require('mongoose');

const connect = () => {

  mongoose.connect('mongodb+srv://<username>:<password>@scc.3tv5tm0.mongodb.net/?retryWrites=true&w=majority',
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