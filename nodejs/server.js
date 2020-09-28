/* eslint-disable indent */
const http = require('http');
const fs = require('fs');
const port = 3006;
const path = require('path');
const todos = require('./db/todos');

// read the html file from the views folder
const readView = (fileName, callback) => {
  // create the full path to our view file
  const filePath = path.join(__dirname, 'views', fileName);
  console.log('filePAth', filePath);

  fs.readFile(filePath, (err, content) => {
    // check if there is an error
    if (err) {
      callback(err);
      return;
    }

    callback(null, content);
  });
};

// create a web server
const server = http.createServer((req, res) => {
  // request handler
  // req and res are objects
  console.log('method:', req.method, 'path:', req.url);

  const getBody = (callback) => {
    let body = '';

    req.setEncoding('utf8');

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('error', (err) => callback(err));

    req.on('end', () => {
      callback(null, body);
    });
  };

  // route or end point is a combination of the method + path
  const route = `${req.method} ${req.url}`;

  // depnding on the route, we're going to send a different response
  switch (route) {
    case 'GET /':
      // async call to readView to get the html page
      readView('index.html', (err, view) => {
        // only here do we have access to the view
        if (err) {
          res.write(err.message);
          res.end();
        }

        res.statusCode = 200;
        res.write(view);
        res.end();
      });

      break;
    case 'GET /todos':
      res.statusCode = 200;
      res.write(JSON.stringify(todos));
      res.end();
      break;

    case 'POST /todos':
      getBody((err, body) => {
        if (err) {
          res.write(err.message);
          res.end();
        }

        // tranform the body into an actual object

        const newTodo = JSON.parse(body);

        // add a id to newTodo
        newTodo.id = Math.random().toString(36).substring(2,8);

        // add the new todo to todos
        todos.push(newTodo);
        res.write('New todo added');
        res.end();
      });
      break;

    default:
      readView('404.html', (err, view) => {
        // only here do we have access to the view
        if (err) {
          res.write(err.message);
          res.end();
        }

        res.statusCode = 404;
        res.write(view);
        res.end();
      });
  }
});

// have our server listens for incoming requests

server.listen(port, () => console.log(`Server is listening on port ${port}`));
