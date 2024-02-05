const http = require('http');

const myEmitter = require('./logEvents');

const port = 3000;

global.DEBUG = false;

const server = http.createServer((request, response) => {
  if (request.url === '/favicon.ico') {
    // Ignore favicon.ico requests
    response.writeHead(204, {'Content-Type': 'image/x-icon'});
    response.end();
    return;
  }
  myEmitter.emit('event', request.url, 'INFO', 'Root of Server successfully rendered.');
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Welcome to the DAL.');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}...`)
});