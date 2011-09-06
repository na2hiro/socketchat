var http = require('http'), url = require('url'), fs = require('fs');
var socketio=require('socket.io'),mongodb=require('mongodb');


var httpserver = http.createServer(function(req, res){
	var path = url.parse(req.url).pathname;
	switch (path){
		case '/':
			path='/index.html';
		case '/index.html':
			fs.readFile(__dirname + path, function(err, data){
				if (err) return send404(res);
				res.writeHead(200, {'Content-Type': path=='/client.js' ? 'text/javascript' : 'text/html'})
				res.write(data, 'utf8');
				res.end();
			});
			break;
		  
		default: send404(res);
	}
	function send404(res){
		res.writeHead(404);
		res.write('404');
		res.end();
	}
});
httpserver.listen(8080);

var io=socketio.listen(httpserver);

io.sockets.on('connection',function(server){
	
});
