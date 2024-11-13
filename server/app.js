//start with the core modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
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

// 2) API Routes
app.use('/api/v1/notes', noteRouter);

// Test route for API
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// 3) Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the client/dist directory
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Handle any GET requests that don’t match the API routes by serving the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

module.exports = app;

