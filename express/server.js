const express = require('express');
const port = 3001;
const todos = require('./db/todos');
const { uid } = require('./utils/util');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('/index.html');
});

app.get('/todos', (req, res) => {
  res.render('todos', { todos });
});

app.post('/todos', (req, res) => {
  const todo = req.body;

  todo.id = uid();

  todos.push(todo);

  res.redirect('/todos');
});

app.get('*', (req, res) => {
  res.render('/404.html');
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
