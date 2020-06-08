const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;
const todos = require('./db/todos');


// create the express instance (creating the server)
const app = express();

// enable body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// static assets - index.html

app.use(express.static('public'));

// setting the view engine to ejs
app.set('view engine', 'ejs');

// Routing
// combination of http verb + url

app.get('/', (req, res) => {

  res.render('index');

});

app.get('/todos', (req, res) => {

  // display the todos
  res.render('todos', {todoArr: todos});

});

app.post('/todos', (req, res) => {

  // extract the todo information from the request
  // attach the information to the req object => req.body

  const newTodo = req.body;
  newTodo.id = 3;

  todos.push(newTodo);

  console.log(todos);
  res.redirect('/todos');


});


// Listen for incoming requests
app.listen(port, () => console.log(`server listening on port ${port}`))