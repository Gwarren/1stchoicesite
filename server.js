var http = require('http'); 
var fs = require('fs');
var url = require('url'); 
var path = require('path'); 

//MIME types 
var mimeTypes = 
{
	"html": "text/html", 
	"jpeg": "img/jpeg", 
	"jpg":  "img/jpg", 
	"png":  "img/png", 
	"js" :  "text/javascript", 
	"css":  "text/css"
}; 
//create server 
http.createServer(function(req, res){
	var port = process.env.PORT || 3000;
	var uri = url.parse(req.url).pathname; 
	var fileName = path.join(process.cwd(), unescape(uri)); 
		console.log('loading ' + uri);
		var stats;

		try { 
			stats = fs.lstatSync(fileName); 
		}
		catch(e) {
			res.writeHead(404, { "content-type" : 'text/plain'});
			res.writeHead("404 not found \n"); 
			res.end(); 
			return; 
		}
		if (stats.isFile()){
			var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
			res.writeHead(200, {"content-type" : mimeType}); 
			console.log("listening on port 3000"); 
			var fileStream = fs.createReadStream(fileName); 
				fileStream.pipe(res); 
		}
		else if (stats.isDirectory()){
			res.writeHead(302, {'Location' : 'index.html'
		});
			res.end();
		}
		else {
			res.writeHead(500, { 'content-type' : 'text/plain'}); 
			res.write('500 internal error \n'); 
			res.end()
		}
		}).listen(port); 

