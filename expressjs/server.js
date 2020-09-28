const express = require('express');
const port = 3006;
const todos = require('./db/todos');
const bodyParser = require('body-parser');

// create the web server
const app = express();
//specify the view engine
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // render the homepage
  res.render('index');
});

app.get('/todos', (req, res) => {
  // render the json of todos
  res.json(todos);
});

app.post('/todos', (req, res) => {
  // add a new todo
  console.log(req.body);
  const newTodo = req.body;
  newTodo.id = Math.random().toString(36).substring(2,8);
  todos.push(newTodo);
  res.redirect('/todos');

});

app.get('*', (req, res) => {
  // render the 404
  res.render('404');
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
