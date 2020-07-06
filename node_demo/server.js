const http = require('http');
const PORT = 3001;

const server = http.createServer((req, res) => {

// handle any request and response inhere

// CRUD
// GET => Read
// POST => write
// PUT => update
// DELETE => Delete

  console.log("Method:", req.method, "url:", req.url);


  if (req.method === 'GET' && req.url === '/') {
    // get the homepage

    // sending a response to the client

    res.write('Homepage');
    res.end();


  }

  if (req.method === 'GET' && req.url === '/todos') {
    // list of todos

    res.write('list of todos');
    res.end();

  }


});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));