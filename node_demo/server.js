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
    console.log('Creating a todo');
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