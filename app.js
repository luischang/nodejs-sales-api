const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const dbHost = process.env.MONGODB_DEV || 'localhost';
mongoose.connect(dbHost);
console.log("VAlue cnx mongoose is "+mongoose.connection.readyState);

const app = express();
app.use(logger('dev'));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Length, Content-Type, Authorization, Access-Control-Allow-Methods');
  next();
});

app.get('/', (req, res) => res.send('Node.js Restful API is running OK?'));

// app.use('/api/v1/airbnb', require('./airbnb/airbnbController'));
app.use('/api/v1/auth', require('./src/auth/authController'));

module.exports = (app);