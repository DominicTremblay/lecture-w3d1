const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

// reading the array of todo objects from db/todos
const todos = require('./db/todos');

// create the server

const server = http.createServer((request, response) => {
  // Route = method + path (url)
  console.log('method:', request.method, 'path:', request.url);

  const route = `${request.method} ${request.url}`;
  let filePath = null;
  // Routing system
  switch (route) {
    case 'GET /':
      // method: GET path: /

      // read the HTML document from local folder on our server
      // '/w3d1/demo/nodejs/views/index.html'
      filePath = path.join(__dirname, 'views', 'index.html');

      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          response.write('Cannot get index.html');
          response.end();
          return;
        }

        // Headers
        response.writeHead(200, { 'content-type': 'text/html' });
        // body
        response.write(content);
        response.end();
      });

      break;

    case 'GET /todos':
      // method: GET path: /todos
      // Headers
      response.writeHead(200, { 'content-type': 'application/json' });

      // body -> send back json
      response.write(JSON.stringify(todos));
      response.end();
      break;

    case 'POST /todos':
      // create a new todo and add it to the database
      // We use streams to extract the body content of the request

      // We need a placeholder to accumulate the chunks
      let body = '';

      request.on('data', (chunk) => {
        console.log("getting data")
        // append the chunk to body
        body += chunk;
      });

      request.on('error', (err) => {
        console.log(err);
      });

      request.on('end', () => {
        // all the chunks are done. We can create a new todo.

        const newTodo = JSON.parse(body);

        console.log(newTodo);

        newTodo.id = Math.random().toString(36).substring(2, 8);

        // add the new todo

        todos.push(newTodo);

        response.writeHead(201, { 'content-type': 'text/plain' });

        response.write('New todo created');

        response.end();
      });

      break;

    default:
      // read the HTML document from local folder on our server
      filePath = path.join(__dirname, 'views', '404.html');

      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          response.write('Cannot get 404.html');
          response.end();
          return;
        }

        // Headers
        response.writeHead(200, { 'content-type': 'text/html' });
        // body
        response.write(content);
        response.end();
      });
  }
});

// Have the server listened for incoming requests
server.listen(port, () => console.log(`Server is listening on port ${port}`));
