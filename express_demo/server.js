const express = require('express');
const PORT = 3001;
const todos = require('./db/todos')
const app = express();
const bodyParser = require('body-parser');


// enable body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 

// routing system

app.set('view engine', 'ejs');

const createNewTodo = (type, description) => {

  const newTodo = {
    id: Math.random().toString(36).substring(2,8),
    type,
    description
  };

  todos.push(newTodo);

};

app.get('/', (req, res) => {

  res.render('index');

});

app.get('/todos', (req, res) => {

  res.json(todos);

});

app.post('/todos', (req, res) => {

  console.log("creating a new todo");
  // extract the body content from the request
  const type = req.body.type;
  const description = req.body.description;

  // create a new todo

  createNewTodo(type, description);

  // redirect to /todos
  res.redirect('/todos');

});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))