const express = require('express');
const port = 3000;
const todos = require('./db/todos');
const bodyParser = require('body-parser')

// create an express app
const app = express();

// app.use activates the middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

// use the ejs template engine
app.set('view engine', 'ejs');

// routing
app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {

  // extract the content from the body of the request

  console.log(req.body);
  const newTodo = req.body // req.body is an object containing the info

  // generate the id
  newTodo.id = Math.random().toString(36).substring(2,8);

  todos.push(newTodo);

  // ask the browser to issue a new get request to /todos
  res.redirect('/todos');

});

app.get('*', (req, res) => {
  res.status(404).render('404');
});

// have the app listen on the port
app.listen(port, console.log(`Server is running on port ${port}`));
