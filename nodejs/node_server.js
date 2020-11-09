const http = require('http');
const fs = require('fs');
const path = require('path');
const todos = require('./db/todos');
const port = 3000;

const requestListener = (request, response) => {

  // manually extracting the body of the request
  const bodyParser = (callback) => {
    // string accumulator to gather all the parts
    let body = '';

    // triggered everytime a chunk of data is received
    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      callback(JSON.parse(body)); // send back the object form
    });
  };

  // extracting the method and the path from the request

  // const { method, url } = request;
  const method = request.method;
  const url = request.url;

  // Building a route (or an end point) = method + path

  const route = `${method} ${url}`;

  let filePath = '';
  switch (route) {
    case 'GET /':
      // build the path the top file
      filePath = path.join(__dirname, 'views', 'index.html');

      // read the file content
      fs.readFile(filePath, 'utf8', (err, content) => {
        //checking for errors
        if (err) {
          console.log(err);
          process.exit(1); // stops node
        }

        response.write(content);
        response.end();
      });

      break;
    case 'GET /todos':
      response.write(JSON.stringify(todos));
      response.end();
      break;
    case 'POST /todos':
      // extract the content sent by the post request
      // request has 2 parts:
      // 1. headers
      // 2. body => {"type":"chores","description":"walk the dog"}

      // we need to extract the body content manually in nodejs

      bodyParser(body => {

        // add the new todo to our list of todos
        const todo = body;
        // generate a random id
        todo.id = Math.random().toString(36).substring(2,8);
        todos.push(todo)


        response.write("New todo added succesfully");
        response.end();


      })


      break;
    default:
      // build the path the top file
      filePath = path.join(__dirname, 'views', '404.html');

      // read the file content
      fs.readFile(filePath, 'utf8', (err, content) => {
        //checking for errors
        if (err) {
          console.log(err);
          process.exit(1); // stops node - 1 means an error, anything below 1, is exiting in a normal fashion
        }

        response.write(content);
        response.end();
      });
  }
};

const server = http.createServer(requestListener);

server.listen(port, () => console.log(`Server is listening on port ${port}`));
