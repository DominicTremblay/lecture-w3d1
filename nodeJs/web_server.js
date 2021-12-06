// we need the http core library
const http = require('http');
const port = 8080;
const fs = require('fs');
const todos = require('./db/todos');


const createHTML = (todos) => {

`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todos</title>
</head>
<body>

  <ul>

    <li>${todos[0].description}</li>
    <li>${todos[1].description}</li>
  </ul>
  
</body>
</html>`

}

// create the web server => node createServer
const server = http.createServer((request, response) => {
  // request handler
  // request => JS object that will contain all the info of the browser request
  // response => JS object that will contain info and methods for the server response

  console.log('http method:', request.method, 'Resource:', request.url);

  // Route => http verb + resource

  const route = `${request.method} ${request.url}`;
  let page;

  switch (route) {
    case 'GET /':
      page = fs.readFileSync('./views/index.html');
      response.write(page);
      response.end();
      break;
    case 'GET /todos':
      page = fs.readFileSync('./views/todos.html');
      // response.write(JSON.stringify(todos));
      response.end(page);
      break;

    default:
      page = fs.readFileSync('./views/404.html');
      response.write(page);
      response.end();
  }

  // the server can access headers info
  // console.log(request.headers);

  // send back a response
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));
