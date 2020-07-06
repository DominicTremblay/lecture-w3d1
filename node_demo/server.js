const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3001;
const todos = require('./db/todos');

const renderHTML = (fileName, cb) => {

  // create the full path to our file


  const filePath = path.join(__dirname, 'views', fileName);

  fs.readFile(filePath, 'utf-8', cb);

};


const server = http.createServer((req, res) => {

// handle any request and response inhere

// CRUD
// GET => Read
// POST => write
// PUT => update
// DELETE => Delete

  console.log("Method:", req.method, "url:", req.url);

  const getBody = (cb) => {
    // extracting the body of the request

    let buffer = '';

    req.on('data', chunk => {
      // getting the body of the request one chunk at a time
      buffer += chunk;

    });

    req.on('end', () => {
      // this triggers when we do have all the chunks
      cb(null, JSON.parse(buffer));
    });


    req.on('error', err => {
      // errors
      cb(err);
    });

  };


  const createNewTodo = (cb) => {
    // capture the data being sent by the request
    // extract the data from the body of the request

    getBody((err, body) => {

      if (err) {
        throw new Error('Error extracting content from request');
      }

      const newTodo = {
        id: Math.random().toString(36).substr(2,8),
        type: body.type,
        description: body.description
      };

      todos.push(newTodo);

      cb(todos);

    });


    // creating a new todo and add it to the db

  };


  // route of end point
  const route = `${req.method} ${req.url}`;

  switch (route) {
  case 'GET /':
    // get the homepage
    // sending a response to the client

    renderHTML('index.html', (err, file) => {
      
      if (err) {
        throw new Error('Cannot read the file');
      }
      res.statusCode = 200;
      res.write(file);
      res.end();

    });

    break;
  case 'GET /todos':
  // list of todos
    res.statusCode = 200;
    if (todos) {
      res.write(JSON.stringify(todos));
      res.end();
    } else {
      res.statusCode = 500;
      res.write('Cannot get todos');
      res.end();
    }
    break;

  case 'POST /todos':

    // capture the data being sent by the request

    createNewTodo(todos => {

      res.writeHead(301, {'Location': '/todos'});
      res.end();

    });


    break;

  default:

    renderHTML('404.html', (err, file) => {
      
      if (err) {
        throw new Error('Cannot read the file');
      }
      res.statusCode = 404;
      res.write(file);
      res.end();

    });

  }



});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));