var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
console.log("Server is running on port 8080");
console.log("");
console.log("In order to test this nodeJS Server, go to localhost:8080 with any extension like getcity, getcity?q=A, hello.html, etc");
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);

  if(urlObj.pathname.indexOf("getcity") !=-1) {
     // Execute the REST service
     fs.readFile('cities.dat.txt', function (err, data) {
  	  var myRe = new RegExp("^"+urlObj.query["q"]);
  	  var cities = data.toString().split("\n");
  	  var jsonresult = [];
  	  if (urlObj.query["q"]) {
  		  for(var i = 0; i < cities.length; i++) {
  			var result = cities[i].search(myRe); 
  			if(result != -1) {
  			  jsonresult.push({city:cities[i]});
  			} 
  		  }  
  	  }
  	  else {
  		for(var i = 0; i < cities.length; i++) {
  		  jsonresult.push({city:cities[i]}); 
  		}
  	  }
  	  console.log(JSON.stringify(jsonresult));
  	  res.writeHead(200);
  	  res.end(JSON.stringify(jsonresult));
  	});
  } else {
     // Serve static files
     fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
  	if (err) {
  	  res.writeHead(404);
  	  res.end(JSON.stringify(err));
  	  return;
  	}
  	
  	res.writeHead(200);
  	res.end(data);
    });
  }
}).listen(8080);