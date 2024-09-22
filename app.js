//start with the core modules
const express = require('express');
const morgan = require('morgan');

const noteRouter = require('./routes/noteRouter');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode!');
  app.use(morgan('dev'));
} else {
  console.log('Production mode');
}
app.use(express.json()); 
app.use(express.static(`${__dirname}/public`)); 


app.use('/api/v1/notes', noteRouter);


module.exports = app;

