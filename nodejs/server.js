const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const todos = require('./db/todos');

// create the web server
const server = http.createServer((req, res) => {
  // request listener
  // req and res are objects containing information about the request or response
  console.log(`method: ${req.method}`); // 4 http verbs GET, POST, PUT, or DELETE
  console.log(`Path: ${req.url}`); // the resource the browser is aking for

  // response

  // create the route
  const route = `${req.method} ${req.url}`;
  let filePath = '';
  // routing
  switch (route) {
    case 'GET /':
      res.statusCode = 200; // 200 = OK

      // read index.html from the views folder
      filePath = path.join(__dirname, 'views', 'index.html');
      console.log(filePath);

      fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
          res.statusCode = 500;
          res.write(err.message);
          res.end();
        } else {
          res.statusCode = 200;
          res.write(fileContent);
          res.end();
        }
      });

      break;
    case 'GET /todos':
      res.statusCode = 200;

      // tranform into text string
      const todoList = JSON.stringify(todos);
      res.write(todoList);
      res.end();

    // create a new todo and add it to list of todos
    case 'POST /todos':
      let body = '';
      // extract the content from the bodu of the request
      // Node deals with streams => break info into chunks
      // content is catched using on data, on end

      // receiving each chunk at a time
      req.on('data', (chunk) => {
        body += chunk;
      });

      // we know we have no more chunks
      req.on('end', () => {
        // create a new todo object
        const newTodo = JSON.parse(body);

        // generate a random id
        newTodo.id = Math.random().toString(36).substring(2, 8);

        // we want to add it to todos list
        todos.push(newTodo);

        // send back a response
        res.statusCode = 201;
        res.write('New Todo Created');
        res.end();
      });

      break;

    default:
      res.statusCode = 404; // 404 = not found

      // read 404.html from the views folder
      filePath = path.join(__dirname, 'views', '404.html');
      console.log(filePath);

      fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
          res.statusCode = 500;
          res.write(err.message);
          res.end();
        } else {
          res.statusCode = 404;
          res.write(fileContent);
          res.end();
        }
      });
  }
});

// have the web server listens for incoming requests
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
