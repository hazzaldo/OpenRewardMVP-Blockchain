//We're using 'express' which is a node JS library, to create
// a server with APIs. To run/start the server, run the command:
//'node dev/api.js' 
//Then to call an api/route, which will be local host and 
//port 3000. If type the URL: localhost:3000  into a browser, 
//this will return the GET api response we have, in this example
//'Hello World'. 
//If you change any api and its response. You need to stop the express
//server (Ctrl+C). Then start it gain (node dev/api.js), to see the changes.

//'nodemon' npm module is also added. This will help in automatically restarting
//our express server application automatically whenever a change in the code 
//in our 'api.js' file takes place. This is made possible by also adding the 
//"start": "nodemon --watch dev -e js dev/api.js" script in the 'package.json' file
//So now we can simply run the command 'npm start', to start our express server,
//and whenever we change any code in the 'api.js' file, it will automatically 
//restart the express server for us, so we don't have to. 
var express = require('express');
//create an app. With this app we can create different end points
//or different routes. 
var app = express();
 
//This GET end point, is ('/blockchain')
//When we hit this endpoint, it is going to return to us our blockchain
app.get('/blockchain', function (req, res) {
  
});

//This POST end point, is ('/transaction')
//When we hit this endpoint, it is going to create new transaction
app.post('/transaction', function(req, res) {

});

//This GET end point, is ('/transaction')
//When we hit this endpoint, it is going to mine a new block for us
app.get('/mine', function(req, res) {
    
});

//This whole server is listening on port 3000. 
//We also passed a function to the listen method, 
//which will console log to output a message informing
//us when the server starts and our port is running, we 
//will be notified of the output console log text.
app.listen(3000, function() {
    console.log('Listening on port 3000... ');
});