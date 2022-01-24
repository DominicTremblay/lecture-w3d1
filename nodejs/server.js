const http = require('http');
const fs = require('fs');
const path = require('path');
const todos = require('./db/todos');

const port = 8080;
// create the webserver

const renderTodos = function (todos) {



  return `
  
  <!DOCTYPE html>
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
    <li>${todos[2].description}</li>
  </ul>
  
</body>
</html>
  
  
  `;
};

const renderView = function (filename) {
  // const filepath = `.nodejs/views/${filename}`;

  console.log("current dir:", __dirname);

  const filepath = path.join(
    path.dirname(__dirname),
    'nodejs',
    'views',
    filename
  );

  const content = fs.readFileSync(filepath, 'utf8');

  return content;
};

const server = http.createServer((request, response) => {
  // handling requests and the responses here
  // request, response are javascript objects containing info about them

  console.log('HTTP METHOD:', request.method, 'PATH:', request.url);

  // to access the request headers
  // console.log(request.headers);

  // ROUTES OR END POINTS
  // ROUTE = method + path

  const route = `${request.method} ${request.url}`;

  switch (route) {
    case 'GET /':
      // send back the homepage
      response.write(renderView('index.html'));
      response.end();
      break;
    case 'GET /todos':
      // send back the todos
      // response.write(JSON.stringify(todos)); // send back the json
      response.write(renderTodos(todos));
      response.end();
      break;
    default:
      response.write(renderView('404.html'));
      response.end();
  }
});

// Server listening for incoming requests
server.listen(port, () => console.log(`Server is listening on port ${port}`));
