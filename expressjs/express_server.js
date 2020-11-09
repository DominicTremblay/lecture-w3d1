const { request } = require('express');
const express = require('express');
const todos = require('./db/todos');
const bodyParser = require('body-parser') // middleware
const port = 3000;

const app = express();

// tell express that we are using ejs templates (others, like pub, handlebars, etc...)
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


// Routes

// getting the homepage
app.get('/', (req, res) => {
  // send back index.html
  res.render('index');
});

// 
app.get('/todos', (req, res) => {
  // res.json(todos);
  res.render('todos', {todos: todos});
});

app.post('/todos', (req, res) => {

  // extracting the body of the request ussing bodyParser
  const todo = req.body;

  todo.id = Math.random().toString(36).substring(2,8);

  // add the new todo to our list of todos
  todos.push(todo);

  // redirect to /todos
  res.redirect('/todos'); // asking the browser to do another request 'GET /todos'

});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
