// creating a server with nodejs wtihout any framework
const http = require('http');
const fs = require('fs');
const todos = require('./db/todos'); // array of objects
const port = 3000;

// request handler
const getHomepage = (req, res) => {
  // send back status code
  res.writeHead(200, { 'content-type': 'text/html' });

  fs.readFile('./views/index.html', 'utf8', (err, content) => {
    if (err) {
      console.log(err.message);
      return;
    }

    // send back the content of the response
    res.write(content);

    // terminate the request
    res.end();
  });
};

const display404 = (req, res) => {
  // send back status code
  res.writeHead(404, { 'content-type': 'text/html' });

  fs.readFile('./views/404.html', 'utf8', (err, content) => {
    if (err) {
      console.log(err.message);
      return;
    }

    // send back the content of the response
    res.write(content);

    // terminate the request
    res.end();
  });
};

const getTodos = (req, res) => {
  // set content application/json
  res.writeHead(200, { 'content-type': 'application/json' });

  // read the todos from the database
  // convert the todos to JSON
  // send back the todos
  res.write(JSON.stringify(todos));

  // terminate the request
  res.end();
};

// create the http server
const server = http.createServer((req, res) => {
  console.log('http verb:', req.method, 'path:', req.url);

  // route = method + path
  const route = `${req.method} ${req.url}`;

  // routing system
  if (route === 'GET /') {
    // display homepage

    getHomepage(req, res);
  } else if (route === 'GET /todos') {
    // display a list of todos

    getTodos(req, res);
  } else {
    // display 404

    display404(req, res);
  }
});

// have the server listens for incoming requests
server.listen(port, () => console.log(`Server is listening on port ${port}`));
