const mongoose = require("mongoose");
const initial = require("../controllers/role.controller");
require('dotenv').config();


const dbURL = process.env.MONGO;

mongoose.Promise = global.Promise;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    initial.initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

module.exports = mongoose;
