const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const compression = require('compression');
// import express from 'express';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import logger from 'morgan';
// import helmet from 'helmet';
// import session from 'express-session';
// import compression from 'compression';

let app = express();

const EXPIRYDATE = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
const PORT = process.env.PORT || 3005;

app.use(logger('dev'));
// Apply body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet())
app.use(compression());
app.set('trust proxy', 1) // trust first proxy
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

// import routes

app.listen(PORT);

console.log(`Server running on port ${PORT}`);