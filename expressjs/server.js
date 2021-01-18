const express = require('express');
const port = 3000;
const morgan = require('morgan');
bodyParser = require('body-parser')

const todos = require('./db/todos');

// create the express server
const app = express();

// tell express that we're using ejs templates
app.set('view engine', 'ejs');

// activate the middleware
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Routing
app.get('/', (req, res) => {
  // Display the home page
  res.status(200).render('index');
});

app.get('/todos', (req, res) => {
  // Diplay the list of todos
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {

  console.log("request post /todos")

  // catch the content of the new todos
  // content is accessible through req.body
  const newTodo = req.body;

  // create a new todo object
  const id = Math.random().toString(36).substring(2,8);

  newTodo.id = id;

  // add it to the list of todos
  todos.push(newTodo);

  // redirect to another page
  res.redirect('/todos');

});

app.get('*', (req, res) => {
  // Display the 404
  res.status(404).render('404');
});

// have the server listen to incoming requests on port 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`));
