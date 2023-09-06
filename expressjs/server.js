// we need expresss
const express = require('express');
// we need a port
const PORT = 3000;

// our array of todo objects
const todos = require('./db/todos');

// create the express app

const app = express();

// body parser middleware
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true })); // handle a form

// specify the view engine => ejs => embedded JavaScript => HTML + JS
app.set('view engine', 'ejs');

// handle the requests and responses
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {
  res.render('todos', { todoList: todos });
});

app.post('/todos', (req, res) => {
  // extract the data from the post request
  // extract the body of the request

  const { type, description } = req.body;

  const id = Math.random().toString(36).substring(2, 8);

  // create a new todo in todos

  todos.push({
    id,
    type,
    description,
  });

  res.redirect('/todos');
});

// 404
app.get('*', (req, res) => {
  res.render('404');
});

// have the express server listen for incoming requests
app.listen(PORT, () => console.log(`Server is running on  port ${PORT}`));
