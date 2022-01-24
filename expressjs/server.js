const express = require('express');
const path = require('path');
const port = 8080;

const todos = require('./db/todos');

// creating the Express server
const app = express();

// body-parser  
app.use(express.urlencoded({extended: true}))


// set the view engine to be ejs (pug, handlebars, etc)
app.set('view engine', 'ejs');

// indicate where the static assets are
express.static(path.join(__dirname, 'public'));

// Handle the routes

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {

  const templateVars = {title: 'List of Todos', todoList: todos}

  res.render('todos', templateVars);
});

app.get('/todos/new', (req,res) => {

  res.render('new_todo');

});

app.post('/todos', (req, res) => {

  // extract the content from the form
  console.log(req.body);
  const description = req.body.description;
  const category= req.body.category;

  // add this content to our todos array
  const newTodo = {
     id: '4re3e',
     description,
     type: category
  }

  todos.push(newTodo);

  // redirect to our todos page
  res.redirect('/todos'); // triggers a new get /todos request
});

app.get('*', (req, res) => {
  res.render('404');
});

// Have the express server listen to incoming requests
app.listen(port, () => console.log(`Server is listening on ${port}`));
