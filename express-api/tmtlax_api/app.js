const express = require('express')
const fs = require('fs')
var https = require('https')
const app = express()
const port = 9321

app.get('/', (req, res) => res.send('Hello World!'))

https.createServer({
	key: fs.readFileSync('cert.key'),
	cert: fs.readFileSync('cert.crt')
}, app).listen(9321, function() {
	console.log('Example App Listening on port 9321!')})
