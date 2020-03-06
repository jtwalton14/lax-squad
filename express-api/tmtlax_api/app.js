const express = require('express')
const fs = require('fs')
//var https = require('https')
const app = express()
const port = 9321
var execFile = require('child_process').execFile

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/:id&:colorL&:colorC&:colorR',function(req, res) {
	// res.send('The picture you specified is: ' + req.params.id + '<br />'
	// 	+ 'The intended left color is: ' + req.params.colorL + '<br />'
	// 	+ 'The intended center color is: ' + req.params.colorC + '<br />'
	// 	+ 'The intended right color is: ' + req.params.colorR + '<br />');

	var child = execFile("./pocket_changer", ["img/rgbWheel.jpg", req.params.colorL, req.params.colorC, req.params.colorR],
		function(error, stdout, stderr)
		{
			res.sendFile(stdout);
		}
	)
	
})
//app.get('/color/add/:color&:value', function(req, res) {
//	res.send('to be implemented, color: ' + req.params.color + ' value: ' + req.params.value);
//})
//app.get('/color/remove/:color', function(req, res) {
//	res.send('to be implemented, color: ' + req.params.color);
//})
//app.get('/pocket/add/:pocket_name&:img_path', function(req, res) {
//	res.send('to be implemented, pocket_name: ' + req.params.pocket_name + ' img_path: ' + req.params.img_path);
//})

//https.createServer({
//	key: fs.readFileSync('cert.key'),
//	cert: fs.readFileSync('cert.crt')
//}, app).listen(9321, function() {
//	console.log('Example App Listening on port 9321!')})


app.listen(port, () => console.log('TMTlax API server listening on port ${port}!'));
