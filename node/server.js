// built-in http library of node
const http = require('http');
const fs = require('fs'); // code node library
const path = require('path');
const port = 3001;
const todos = require('./db/todos');
const {uid} = require('./utils/util');

const printReqDetails = () => {
  console.log('Method:', req.method); // GET, POST, PUT, DELETE
  console.log('url', req.url);
  console.log('headers', req.headers);
};

// Create the web server
const server = http.createServer((req, res) => {
  // request handler will accept 2 parameters
  // req, res => automatically populated by node
  // req  =>  request object
  // res => response object

  // Request => method, url, headers, a way to handle the body

  // Routing => combination of the method + url
  const route = `${req.method} ${req.url}`; // GET /todos

  switch (route) {
    case 'GET /':
      // read the index.html
   
      // creating the full path to the file
      const filePath = path.join(__dirname, 'views', 'index.html'); 

      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log('ERROR', err);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.write('Error getting the resource');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(data);
        }
      });

      // res.end();
      break;

    case 'GET /todos':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(todos));

      // res.write(JSON.stringify({msg: "your're asking for a list of todos"}));
      res.end();
      break;

    case 'POST /todos':
      // we need to extract the todo from the request
      let bufferStr = '';

      req.on('data', part => {
        bufferStr += part;
      });

      req.on('end', () => {
        console.log(bufferStr);
        // create a new todo
        const newTodo = JSON.parse(bufferStr);
        newTodo.id = uid();
        // add the todo the the list of todos
        todos.push(newTodo);

        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.write('Todo created');
        res.end();
      })

      req.on('error', err => {
        console.log('ERROR', err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.write('Error getting the resource');
      })


      //redirect to GET /todos
      break;

    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write('404, Not Found!');
      res.end();
  }
});

// Have the webserver listen for incoming requests
server.listen(port, () => console.log(`server is running on port ${port}`));
