require("dotenv").config()

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const compression = require("compression");
const router = require("./routes");
const cors = require("cors");
const config = require("./config");
const passport = require('passport');

let app = express();

const EXPIRYDATE = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
// const PORT = process.env.PORT;
// const SERVER = process.env.SERVER;
// const DATABASE = process.env.DATABASE;
/* APP SETUP */

app.use(logger("dev"));
app.use(cors(config.corsOptions)); // TODO: define 
// Apply body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize())
app.use(helmet())
app.use(compression());
app.set("trust proxy", 1) // trust first proxy
app.set("json spaces", 2); // for prettify in express 4
app.use(session({
  secret: "s3Cur3",
  name: "sessionC1-10P",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    //   domain: "",
    //   path: "",
    expires: EXPIRYDATE
  }
}))

router(app);

module.exports = app
// import routes
mongoose.connect(config.db)
.then(() => {
  app.listen(config.port);
  console.log(`Server running on port ${config.port}, no matter what you say or what you do`);
})
.catch((e) => {
  console.log(e);
  console.log("Operation terminated, was not able to connect to the database")
  throw e;
})