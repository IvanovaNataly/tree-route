const http = require('http');

const  server = http.createServer( (request, response) => {
  if (request.url === '/') {
    response.write('base url');
    response.end();
  }
  if (request.url === '/users') {
    response.write(JSON.stringify([1, 2, 3]));
    response.end();
  }
});

server.listen('3000');

console.log('listening...');
