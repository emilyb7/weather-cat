var http = require("http");
var fs = require("fs");
var querystring = require("querystring");

function handler(request, response){
  var endpoint = request.url;
  var method = request.method;
  if(endpoint === "/") {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + "/index.html", function(error, file) {
      if(error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    })
  } else {
    var fileName = request.url;
    var fileType = request.url.split(".")[1];
    response.writeHead(200, {"Content-Type": "text/" + fileType});
    fs.readFile(__dirname + "/public" + fileName, function(error, file) {
      if(error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    });
  }
}
var server = http.createServer(handler);

var port = (process.env.port || 8080);

server.listen(port, function() {
  console.log("server is listening on port 8080. Ready to accept requests!");
})
