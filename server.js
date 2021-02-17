var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html', null, function(error, data) {
    if (error) {
      res.writeHead(404);
      res.write("Page not found");
    } else {
      res.write(data);
    }
    res.end();
  });
}).listen(3000, '127.0.0.1');

console.log('Server running at 127.0.0.1:3000');