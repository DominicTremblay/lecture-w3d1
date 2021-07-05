const http = require('http');
const port = 3000;
const todos = require('./db/todos'); // require the array of todos
const fs = require('fs');
const path = require('path');

// helper function to read our view files

const readView = (req, res, path) => {
  fs.readFile(path, 'utf8', (err, content) => {
    if (err) {
      console.log(err.message);
      return;
    }

    res.writeHead(200, { 'content-type': 'text/html' });

    res.write(content);

    res.end();
  });
};

// creating the web server and handling request with a request handler
// req, and res are the request and response objects
const server = http.createServer((req, res) => {
  // action is happening here in this request handler
  // req.method => http verb
  // req.url => path (resource)

  console.log('Method:', req.method, 'Path:', req.url);

  // combination of method + path => route or end-point
  const route = `${req.method} ${req.url}`; // ex. GET /
  console.log({ route });

  if (route === 'GET /') {
    console.log('you asked for the homepage');
    // the server needs to send back a response

    // // create a response headers => writeHead
    // res.writeHead(200, { 'content-type': 'text/html' });

    // // send back the response => write
    // res.write('<html><body>you asked for the homepage</html>');

    // // terminate the response
    // res.end();

    // bulding the path to our index.html file => /demo/views/index.html
    const filePath = path.join(__dirname, 'views', 'index.html');

    console.log({ filePath });

    readView(req, res, filePath);
  } else if (route === 'GET /todos') {
    // send back a list of todos

    // create a response headers => writeHead
    res.writeHead(200, { 'content-type': 'application/json' });

    // send back the response => write
    // JSON.stringify => convert to string format
    // JSON.parse => convert back to object form
    res.write(JSON.stringify(todos));

    res.end();
  } else {
    // bulding the path to our index.html file => /demo/views/index.html
    const filePath = path.join(__dirname, 'views', '404.html');

    console.log({ filePath });

    readView(req, res, filePath);
  }
});

// server is listening

server.listen(port, () => console.log(`Server is listening on port ${port}`));
