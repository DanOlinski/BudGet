// load .env data into
require('dotenv').config();

// Web server
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
//this is to handel data from HTML forms
app.use(express.urlencoded({ extended: true }));
//this is to handel data in json formats
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
const debug = require('./routes/debug.js');
const user = require('./routes/user.js');
const getters = require('./routes/getters.js');


// Mount all resource routes
app.use('/debug', debug);
app.use('/user', user);
app.use('/getters', getters);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

