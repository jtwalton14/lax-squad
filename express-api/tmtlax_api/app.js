const express = require('express')
const fs = require('fs')
//var https = require('https')
const app = express()
const port = 9321
var execFile = require('child_process').execFile;

// view images
app.get('/base/:id', function(req, res) {
	var id;
	if (req.params.id == 1)
	{
		var id = "img/rgbWheel.jpg";
	}
	else if (req.params.id == 2)
	{
		var id = "/home/jtwalton/lax-squad/express-api/tmtlax_api/img/testpocket.jpg";
	}
	else if (req.params.id == 3)
	{
		var id = "img/rgbpocket.jpg";
	}
	else if (req.params.id == 4)
	{
		var id = "img/pocketpic.jpg";
	}

	res.sendFile(id);
})

//get edited image
app.get('/:id&:colorL&:colorC&:colorR',function(req, res) {

	// var id;
	// if (req.params.id == 1)
	// {
	// 	var id = "img/rgbWheel.jpg";
	// } else if (req.params.id == 2)
	// {
	// 	var id = "img/testpocket.jpg";
	// } else if (req.params.id == 3)
	// {
	// 	var id = "img/rgbPocket.jpg";
	// } else if (req.params.id == 4)
	// {
	// 	var id = "img/pocketpic.jpg";
	// }

	var child = execFile("./pocket_changer", [req.params.id, req.params.colorL, req.params.colorC, req.params.colorR],
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

//save new image
app.post('/', function(req, res){
	var form = new formidable.IncominfForm();
	form.parse(req);

	//saves file to img folder
	form.on('fileBegin', function(name, file){
		file.path = 'img/' + file.name;
	});

	form.on('file', function(name, file){
		console.log('Uploaded ' + file.name);
	});

	//adds file name to pockets.txt file
	fs.appendFile('confs/pockets.txt', file.name, 'utf8',
		function(err) {
			if(err) throw err;
			console.log("Data is appended to file Successfully.")
	});
})

//save new color & hue
app.get('/:color&:hue', function(req, res){
	var data = req.params.color + ' ' + req.params.hue;

	fs.appendFile('confs/colors.txt', data, 'utf8',
	function(err) {
		if(err) throw err;
		console.log("Data is appended to file successfully.")
	});
})


app.listen(port, () => console.log('TMTlax API server listening on port 9321!'));
