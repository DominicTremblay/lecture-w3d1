/* eslint-disable indent */
// import the built-in http library
const http = require('http');

// filesystem
const fs = require('fs');

// path
const path = require('path');

// define a port
const port = 3006;

// import the list of todos
// const todos = require('./db/todos');


const todos = [
  {
    id: '8e5a',
    type: 'movies/shows',
    description: 'Watch Umbrella Academy',
  },
  {
    id: '8cd1',
    type: 'books',
    description: 'Read Lord of the Rings',
  },
];


const renderHTML = (fileName, cb) => {
  // creating the full path to that file
  const filePath = path.join(__dirname, 'views', fileName);

  fs.readFile(filePath, 'utf8', cb);
};

// create the http server
// define a request listener -> catch the request and provide a response
const server = http.createServer((req, res) => {
  // request object -> all the details about the request

  console.log('http verb:', req.method, 'Path:', req.url);

  // console.log("req Headers");
  // console.log(req.headers);

  // route (end-point) -> combination of the verb + path
  const route = `${req.method} ${req.url}`;

  console.log('route', route);

  switch (route) {
    case 'GET /':
      // getting the home page
      res.statusCode = 200;
      renderHTML('index.html', (err, content) => {
        if (err) {
          throw new Error(err.message);
        }

        res.statusCode = 200;
        res.write(content);
        res.end();
      });
      break;

    case 'GET /todos':
      // getting the list of todos
      res.statusCode = 200;

      // send back the json of the todos
      res.write(JSON.stringify(todos));
      res.end();
      break;

    case 'POST /todos':
      
      let contentBody = '';
    
      // creating a new todo
      res.write('you did a post request');
      
      // getting the request body

      req.on('data', part => {

          contentBody += part.toString();
      });

      req.on('end', () => {

        // add a new todo to the list of todos

        const newTodo = JSON.parse(contentBody);

        // generating a random id
        newTodo.id = Math.random().toString(36).substring(2,8);

        todos.push(newTodo);

        res.write('a new todo has been added');

        res.end();

      });


      break;

    default:
      renderHTML('404.html', (err, content) => {
        if (err) {
          throw new Error(err.message);
        }

        res.statusCode = 404;
        res.write(content);
        res.end();
      });
  }

  // response object -> all the details about the response
});

// have the server listen for incoming requests from clients (web browser)
server.listen(port, () => console.log(`Server is listening on port ${port}`));
