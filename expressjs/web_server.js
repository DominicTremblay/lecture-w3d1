const express = require('express');
const port = 8080;
const todoList = require('./db/todos');

// create the express server
const app = express();

// inform express that we're using ejs files (pug, handlebars)
app.set('view engine', 'ejs');

// GET / => display the home page;
app.get('/', (req, res) => {
  // display the home page
  res.render('index');
});

// GET /todos => display the list of todos
app.get('/todos', (req, res) => {
  // display a list of todos
  res.render('todos', {todoList: todoList});
});

app.get('*', (req, res) => {
  res
    .status(404)
    .render('404', {message: 'Hello Gang!', error: 'Hey, what are you doing?'});
});

// 404 => everything elses

// have the express server listens for incoming requests
app.listen(port, () => console.log(`Server is listening to port ${port}`));
