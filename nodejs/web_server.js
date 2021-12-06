const http = require('http');
const port = 3000;
const fs = require('fs');
const todoList = require('./db/todos');

const createLi = (todoList) => {

  let output = '';

  for (let todoObj of todoList) {

    output += `<li>${todoObj.description}</li>`

  };

  return output;

}


const createHTMLTodos = (todoList) => {
  const page = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todos</title>
</head>
<body>
  
  <h1>List of todos</h1>

  <ul>

    ${createLi(todoList)}


  </ul>

</body>
</html>
  
  `;

  return page;
};

// create the webserver
const server = http.createServer((request, response) => {
  // request => js object that contains info and methods about the request
  // response => js object that contains info and methods about the response

  // handle the request here
  console.log('Method:', request.method, 'Resource:', request.url);

  // route = combination of http verb + resource (path)
  const route = `${request.method} ${request.url}`;

  if (route === 'GET /') {
    // hompage
    // send a response
    // Read the HTML file
    const page = fs.readFileSync('./views/index.html');
    response.write(page);
    response.end(); // sends back the response
  } else if (route === 'GET /todos') {
    // todos
    // response.write(JSON.stringify(todoList));
    // const page = fs.readFileSync(createHTMLTodos(todoList));
    response.write(createHTMLTodos(todoList));
    response.end();
  } else if (route === 'POST /todos') {
    console.log('Creating a new todo');

    response.write('Creating a new todos');
    response.end();
  } else {
    // 404 - not found
    const page = fs.readFileSync('./views/404.html');
    response.write(page);
    response.end();
  }

  // manipulate the headers info
  // console.log(request.headers);
});

server.listen(port, () => console.log(`Server is listening to port ${port}`));
