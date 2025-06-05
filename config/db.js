const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected Successfully");
    })
    .catch((err) => {
      console.log("DB failed to connect");
      console.log(err);
    });
};
