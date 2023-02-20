const express = require('express');
const todosDB = require('./db/todos');
const port = 3001;

// creating the server app
const app = express();

// tell express we want to use the ejs view engine
app.set('view engine', 'ejs');

// routing system
app.get('/', (req, res) => {
  // display the home page
  res.render('index');
});

app.get('/todos', (req, res) => {
  res.render('todos', {todosList: todosDB});
});

app.get('*', (req, res) => {
  res.send('404 - Not found');
});

//have the server listens for incoming requests
app.listen(port, () => console.log(`server is running on port ${port}`));
