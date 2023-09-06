// http protocol
const http = require('http');
// need the file system
const fs = require('fs');

// get the todos from the db
// const todos = require('./db/todos');

const todos = [
  {
    id: '8e5a',
    type: 'movies/shows',
    description: 'Watch Umbrella Academy',
  },
  {
    id: '8cd1',
    type: 'books',
    description: 'Read Lord of the Rings',
  },
  {
    id: '4f3e',
    type: 'movie',
    description: 'The Expanse',
  },
];

const createHTMLTodos = require('./helpers/createHTMLTodos');

// declare a port
const PORT = 3000;

// create the web server

const server = http.createServer((req, res) => {
  // Handle the requests and the responses
  // declare the request handler
  // req and res are JS objects
  // req.method, req.url

  console.log('method:', req.method, 'Path:', req.url);

  // router system

  const route = `${req.method} ${req.url}`;

  console.log({ route });

  let page;

  switch (route) {
    case 'GET /':
      // Handle homepage
      // READ operation
      page = fs.readFileSync('./views/index.html')
      res.write(page);
      res.statusCode = 200;
      res.end();
      break;
    case 'GET /todos':
      page = createHTMLTodos(todos);
      res.write(page);
      res.statusCode = 200;
      res.end();
      break;
    default:
      page = fs.readFileSync('./views/404.html')
      res.write(page);
      res.statusCode = 404;
      res.end();
  }

  // handling the todos
  // Display the list of todos =>   READ operation

  // create a new todo => CREATE operation

  // handling the 404
  // READ operation

  res.end();
});

// have the web server listens for incoming requests
server.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
