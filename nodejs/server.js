/* eslint-disable indent */
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 6001;
const todos = require('./db/todos');

const server = http.createServer((req, res) => {
  // combination of method + path =>  route
  const route = `${req.method} ${req.url}`;

  console.log('Route:', route);

  switch (route) {
    case 'GET /':
      // read the file index.html

      // build the full path to the file
      const filePath = path.join(__dirname, 'views', 'index.html');

      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          res.statusCode = 500;
          res.write(err.message);
          res.end();
        } else {
          res.statusCode = 200;
          res.write(content);
          res.end();
        }
      });

      break;
    case 'GET /todos':
      // server needs to send back a list of todos (JSON)

      // making our todos a string
      const todoList = JSON.stringify(todos);

      res.statusCode = 200;
      res.write(todoList);
      res.end();

      break;

    case 'POST /todos':
      // create a new todo to be added to the list
      // http request had 2 parts => 1. request headers 2. request body
      // POST will need the information from the body of the request
      // extract information from the request body

      let body = '';

      req.on('data', (part) => {
        body += part.toString();
      });

      req.on('end', () => {
        // create a new todo

        const newTodo = JSON.parse(body);

        newTodo.id = Math.random().toString(36).substring(2, 8);

        // add the new todo

        todos.push(newTodo);

        // res.statusCode = 201;

        // redirection to /todos

        res.writeHead(302, {
          Location: '/todos',
        });

      });
      break;

    default:
      // build the full path to the file
      const filePath404 = path.join(__dirname, 'views', '404.html');

      fs.readFile(filePath404, 'utf8', (err, content) => {
        if (err) {
          res.statusCode = 500;
          res.write(err.message);
          res.end();
        } else {
          res.statusCode = 404;
          res.write(content);
          res.end();
        }
      });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
