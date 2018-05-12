const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const compression = require('compression');
const router = require('./routes');
const cors = require('cors');
const config = require('./config');

let app = express();

const EXPIRYDATE = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
const PORT = process.env.PORT || 3005;
const SERVER = '127.0.0.1:27017';
const DATABASE = 'react-universal';
/* APP SETUP */

app.use(logger('dev'));
app.use(cors(config.corsOptions)); // TODO: define 
// Apply body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet())
app.use(compression());
app.set('trust proxy', 1) // trust first proxy
app.set('json spaces', 2); // for prettify in express 4
app.use(session({
  secret: 's3Cur3',
  name: 'sessionC1-10P',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    //   domain: '',
    //   path: '',
    expires: EXPIRYDATE
  }
}))
router(app);

module.exports = app
// import routes

mongoose.connect(`mongodb://${SERVER}/${DATABASE}`)
.then(() => {
  app.listen(PORT);
  console.log(`Server running on port ${PORT}, no matter what you say or what you do`);
})
.catch((e) => {
  console.log(e);
  console.log("Operation terminated, was not able to connect to the database")
  throw e;
})