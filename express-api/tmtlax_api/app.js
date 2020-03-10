const express = require('express')
const fs = require('fs')
//var https = require('https')
const app = express()
const port = 9321
var execFile = require('child_process').execFile

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/:id&:colorL&:colorC&:colorR',function(req, res) {

	var id;
	if (req.params.id == 1)
	{
		var id = "img/rgbWheel.jpg";
	} else if (req.params.id == 2)
	{
		var id = "img/testpocket.jpg";
	} else if (req.params.id == 3)
	{
		var id = "img/rgbPocket.jpg";
	}

	var child = execFile("./pocket_changer", [id, req.params.colorL, req.params.colorC, req.params.colorR],
		function(error, stdout, stderr)
		{
			res.sendFile(stdout);
			console.log("Sending picture " + req.params.id + " with colors " + req.params.colorL + " & " + req.params.colorC + " & " + req.params.colorR+ ".")
			if (error)
			{
				console.log(stderr);
			}
		}
	)
	
})
//https.createServer({
//	key: fs.readFileSync('cert.key'),
//	cert: fs.readFileSync('cert.crt')
//}, app).listen(9321, function() {
//	console.log('Example App Listening on port 9321!')})


app.listen(port, () => console.log('TMTlax API server listening on port 9321!'));
