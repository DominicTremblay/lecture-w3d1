const express = require('express');
const port = 3000;
const todoList = require('./db/todos');
const morgan = require('morgan');




// create the webserver
const app = express();

// app.use => activate the middelware

app.use(morgan('tiny'));



// tell express what we're using ejs template files (pug, handlebars)
app.set('view engine', 'ejs');

// GET / => Homepage
app.get('/', (req, res) => {
  // homepage
  res.render('index');
});

// GET /todos => list of the todos

app.get('/todos', (req, res) => {
  // todos

  const message = 'Hello Gang!';

  res.render('todos', { todoList, message });
});

// anything else => 404
app.get('*', (req, res) => {
  // 404
  res.render('404');
});

// have the web server to listen on port
app.listen(port, () => console.log(`Server is listening on port ${port}`));
