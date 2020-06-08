// core module of node
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3001;

const todos = require('./db/todos');
const {uid} = require('./utils/util');

// create a web server with http.createServer

const printReqDetails = (req) => {
  console.log('url', req.url);
  console.log('method', req.method);
  console.log('headers', req.headers);
  console.log('cookies', req.headers['cookie']);
};

const readPage = (fileName) =>
  new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'views', fileName);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(data);
    });
  });

const getBody = (req) =>
  new Promise((resolve, reject) => {
    let buffer = '';

    req.on('data', (part) => {
      buffer += part;
    });

    req.on('end', () => resolve(buffer));

    req.on('error', () => reject(error));
  });

const server = http.createServer((req, res) => {
  // req, and res are the request and response objects supplied by node to handle incoming requests and outgoing responses

  // req contains info about url, method, request headers, and the body (data)
  // printReqDetails(req);

  // Routing
  // Routing = create handlers for incoming requests with a combination of method + url
  // method > http verbs

  const route = `${req.method} ${req.url}`;

  switch (route) {
    case 'GET /':
      readPage('index.html')
        .then((page) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(page);
        })
        .catch((err) => {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.write(err);
        })
        .finally(() => res.end());
      break;

    case 'GET /todos':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ todos }));
      res.end();
      break;

    case 'POST /todos':
      getBody(req)
        .then((todo) => {
          const newTodo = JSON.parse(todo);
          newTodo.id = uid();
          todos.push(newTodo);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ msg: 'Todo has been added' }));
          res.end();
        })
        .catch((err) => console.log(err));
      break;
    default:
      readPage('404.html')
        .then((page) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(page);
        })
        .catch((err) => {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.write(err);
        })
        .finally(() => res.end());
  }
});

//starts the http servers - listen for incoming connections
server.listen(port, () => console.log(`Server running on port ${port}`));
