const http = require('http');
const fs = require('fs');
const todosDB = require('./db/todos');
const createTodoHTML = require('./views/todos.js');

const port = 3001;

// create the web server
const server = http.createServer((request, response) => {
  // request and response are objects that node populates out of the request and response info
  // handle the requests and responses

  console.log({
    'http method': request.method,
    'http path (resource);': request.url,
  });

  // destructuring
  const { method, url } = request;
  // equivalent to
  // const method = request.method;
  // const url = request.url;

  // route? =? http verb + url (path);
  const route = `${method} ${url}`;

  console.log({route});
  // tranform this into a switch statement => start to create a routing system
  if (route === 'GET /') {
    // display the home page

    const page = fs.readFileSync('./views/index.html');

    response.write(page);
    response.statusCode = 200;
    response.end();
  } else if (route === 'GET /todos') {
    // display the list of todos

    const page = createTodoHTML(todosDB);
  
    response.write(page);
    response.statusCode = 200;
    response.end();
  } else {
    // 404 not found
    response.write('404 - Not found');
    response.statusCode = 404;
    response.end();
  }


  // send back a response
  // response.write(`<h1>Hello didn't close the response</h1>`);
  // response.end();
});

// Have the server listens for a request
server.listen(port, () => console.log(`Server is listening to port ${port}`));
