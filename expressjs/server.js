const express = require('express');
const port = 6001;
const app = express();
const todos = require('./db/todos');
const bodyParser = require('body-parser');

// create a middleware function
const sayHello = (req, res, next) => {

  req.hello = 'Hello middleware';

  console.log(req.method, req.url);

  next();

};

// routing in express

// templates are going to be using ejs => embedded JavaScript (HTML tags + javascript)

app.set('view engine', 'ejs');

// MIDDLEWARE => sits in between the request and response

app.use(sayHello); // using the custom middleware

// app.use => middleware => activating that middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 

// ROUTING


// display the home page
app.get('/', (req, res) => {

  // serving index.ejs from the views folder
  res.status(200).render('index');

});

app.get('/hello', (req, res) =>{

  res.send(req.hello);

});

// display the list of todos
app.get('/todos', (req, res) => {

  res.json(todos);

});

app.post('/todos', (req, res) => {

  // extract the information from the request body
  // use body parser to extract the infor => req.body
  const newTodo = req.body;

  newTodo.id = Math.random().toString(36).substring(2,8);

  todos.push(newTodo);

  res.redirect('/todos');

});

// sending back 404
app.get("*", (req, res) => {

  res.render('404');

});


app.listen(port, () => console.log(`Server is listening on port ${port}`));