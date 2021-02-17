var http = require('http');
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end();
}).listen(3000, '127.0.0.1');
console.log('Server running at 127.0.0.1:3000');