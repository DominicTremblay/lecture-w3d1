// import express
const express = require('express');
const todos = require('./db/todos');
const port = 3006;

// adding body-parser
const bodyParser = require('body-parser');

// create an exppress app

const app = express();

// specify the template engine => ejs
app.set('view engine', 'ejs');

// using static assets (images, css, client-side js) from the public folder
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// define request listeners

// getting the home page
app.get('/', (req, res) => {
  res.render('index');
});

// getting the list of todos
app.get('/todos', (req, res) => {
  // rendering the list of todos in json
  res.json(todos);
});

// creating a new todo
app.post('/todos', (req, res) => {
  // req.body -> gives you the body of the requests

  // extracting the content from the body of the request
  const newTodo = req.body;

  // generate our random id
  newTodo.id = Math.random().toString(36).substring(2,8);

  todos.push(newTodo);

  // redirection to GET /todos
  res.redirect('/todos');

});

app.get('*', (req, res) => {
  res.statusCode(404);
  res.render('404');
});

// have our express listen for incoming requests

app.listen(port, () => console.log(`Server is listening to port ${port}`));
