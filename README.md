# W3D1 Lecture - Web Servers

## Content

- What is a Web Server
- What is NodeJS
- Creating a Web Server With NodeJS
- Creating a Web Server With ExpressJS

### What is a Web Server?

- A Web server handles requests from a http client and
- Might interact with the Database for Data
- Serves back the response to the client

Some web servers:

- Apache
- Nginx
- Microsoft
- LiteSpeed
- Google Servers
- NodeJS

### Request/Response

- [Web communication flow](./web_server.png)

## What is NodeJS

**A JavaScript run-time environement(Chrome V8) + I/O built-in libraries (file system, http, net) + module system (npm)**

- Back in the days, JavaScript could only be executed in the browser
- In 2009, Ryan Dahl took the Google V8 engine and wrapped it in a c++ program
- A JavaScript runtime environment built on chrome V8 that can be run on a computer as a standalone application
- With NodeJS, network applications such as web servers (http) can be written in JavaScript
- It has an event-driven architecture and asynchronous I/O
- Node has a huge ecosystem thanks to npm (main reason of the popularity of node)

[2018 Node Survey](https://nodejs.org/en/user-survey-report/)

## Create a Web Server with Node

- We'll be creating a todos API using pure NodeJS
- We'll then use Express to see what is the difference

### Request Listener

- `createServer` takes an `requestListener` function as a parameter.

#### requestListener objects

- Node will create automatically 2 JavaScript objects that handles

1. Incoming Message Object

contains a bunch of properties

```js
    {
      url,
      method,
      headers,
    ...
    }
```

2. Server Response Object

```js
  {
    statusCode,
    setHeader(),
    write(),
    end(),
    ...
  }
```

## ExpressJS

- Framework

  - Give us the basics to deal with request and response
  - Handle routing
  - Create Dynamic HTML pages (templating)
  - We can use package to deal with body (middleware)

### Running the app

- `node server.js` from the **nodejs** folder for the node version
- For the Express version:

  - npm install from the **ex_framework** folder
  - `node server.js`
