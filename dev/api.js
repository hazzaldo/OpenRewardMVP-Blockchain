//We're using 'express' which is a node JS library, to create
// a server with APIs. To run/start the server, run the command:
//'node dev/api.js' 
//Then to call an api/route, which will be local host and 
//port 3000. If type the URL: localhost:3000  into a browser, 
//this will return the GET api response we have, in this example
//'Hello World'. 
//If you change any api and its response. You need to stop the express
//server (Ctrl+C). Then start it gain (node dev/api.js), to see the changes.
var express = require('express')
//create an app. With this app we can create different end points
//or different routes. 
var app = express()
 
//This is an example of GET end point, which is just slash ('/')
//and with this end point, we're sending back response of hello world.
app.get('/', function (req, res) {
  res.send('Hello World amended')
})

//this whole server is listening on port 3000.
app.listen(3000)