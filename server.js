const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const moviesRouter = require('./routes/movies');
const logger = require('./middlewares/logger');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware
app.use(logger);

// Routes
app.use('/movies', moviesRouter);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});