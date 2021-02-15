const express = require('express');
const port = 3000;

const todos = require('./db/todos');

// create the web server => creating an express app
const app = express();

// tell express that we're using ejs to render our views (html)
// ejs = embedded JavaScript => mix of HTML + javaScript

app.set('view engine', 'ejs');

// request handlers
// routing system of express

app.get('/', (req, res) => {
  // displaying the homepage

  res.status(200).render('index');
});

app.get('/todos', (req, res) => {
  // display the list of todos

  res.status(200).render('todos', {todosList: todos});
});

app.get('*', (req, res) => {
  // display 404
  res.status(404).render('404');
});

// have the webserver listening for incoming requests
app.listen(port, () => console.log(`Server is listening on port ${port}`));
