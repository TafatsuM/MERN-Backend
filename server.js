const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routerCustomer = require("./app/routes/db.routes");
const routerStaff = require("./app/routes/staff.routes");
const routerAuth = require('./app/routes/auth.routes');
var winston = require('./app/log/winston');
// const logger = require("./logger");
// logger.info("Info log example");
require('dotenv').config();

const morgan = require('morgan');
//app.use(morgan('combined'));
app.use(morgan('combined', { stream: winston.stream }));

// let corsOptions = {
//   origin: "http://localhost:8001",
// };
// app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin,  X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend application." });
});

require("./app/config/db.config");

app.use("/api/customers", routerCustomer);
app.use("/api/staff", routerStaff);
app.use("/api/auth", routerAuth);



app.use('/login', (req, res) => {
  console.log(req.body)
  res.send({
    token: 'test123'
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
