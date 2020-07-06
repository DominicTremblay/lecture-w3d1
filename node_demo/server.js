const http = require('http');
const PORT = 3001;
const todos = require('./db/todos');

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

  switch(route) {
  case 'GET /':
    // get the homepage
    // sending a response to the client
    res.statusCode = 200;
    res.write('Homepage');
    res.end();
  
    break;
  case 'GET /todos':
  // list of todos
    res.statusCode = 200;
    res.write(JSON.stringify(todos));
    res.end();
    break;

  default:
    res.statusCode = 404;
    res.write('404 not found');
    res.end();
  }



});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));