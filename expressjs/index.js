const express = require('express');
const port = 3000;
const todos = require('./db/todos');
const morgan = require('morgan')

// create the express app
const app = express();

// instruct express that we're using 'ejs' files
// view engine => ejs (pug, handlenbars..)


app.set('view engine', 'ejs');

// app.use => middleware
app.use(morgan('tiny'));

// define the routes
// Multiple Request handlers

app.get('/', (req, res) => {

// display the homepage

  res.render('index');

});

app.get('/todos', (req, res) => {
// display the list of todos in JSON format
  res.render('todos_list', {todoList: todos, msg: "Hello gang!"});
});

app.get('*', (req, res) => {

  // display the 404
  res.render('404')
})



// Express is listening for incoming request
app.listen(port, () => console.log(`Server is listening on port ${port}`));