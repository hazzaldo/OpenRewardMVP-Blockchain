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

//body-parser npm module, parses incoming request bodies in a middleware before your handlers, 
//so that your request body JSON becomes accessible/available under the req.body property.
//Note as req.body's shape is based on user-controlled input, all properties and values 
//in this object are untrusted and should be validated before trusting. 
//For example, req.body.foo.toString() may fail in multiple ways, for example the foo property 
//may not be there or may not be a string, and toString may not be a function and instead a string 
//or other user input. 
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

//this library creates a unique random string for us.
//We're going to use this string as this network node address.
const uuid = require('uuid/v1');

//refers to the "start": "nodemon --watch dev -e js dev/api.js 3001" command in 
//package.json, to start the express server. You can think of this command
//as an array of elements. The first two elements are represented by 
//"nodemon --watch dev -e js dev/api.js". 
//Note we added 3001 (representing the port number), to the end of 
//this command in package.json. This is the third element of the command. 
//If we wanted to add more vairables then we add a space followed by more 
//variables to the command. So to access the third element we use argv[2] 
//(as it is 0-indexed array) by doing this we have access to our port variable
//inside of our network node.
//Now we can run our networkNode file with our port being passed in as a variable.
const port = process.argv[2]; 
//creates a uuid for this node to act as the recipient address
//to receive any incoming cryptocurrency. We use the split method
//to remove the dashes that will be included in the uuid by default.
//the random string uuid created is guaranteed to be unique to a very 
//high percentage. We need to ensure the uuid is unique for every node
//otherwise we will end up sending cryptocurrency to more than one node.
const nodeAddress = uuid().split('-').join('');

const testcoin = new Blockchain();

//If a request comes in with JSON data ... 
app.use(bodyParser.json());
//or with form data, then we simply want to parse that data so that we can access
//it in any of the routes/end points we write in our express server code.
//so any of the end points we hit, our data will first go through the Body Parser
//so we can access the data. Then we can use the data in whichever end point we'll
//be receiving it.
app.use(bodyParser.urlencoded({ extended: false }));

//This GET end point, is ('/blockchain')
//When we hit this endpoint, it is going to return to us our blockchain
app.get('/blockchain', function (req, res) {
    //End point will return our Blockchain
    res.send(testcoin);
});

//This POST end point, is ('/transaction')
//When we hit this endpoint, it is going to create new transaction
app.post('/transaction', function(req, res) {
    //We're creating a new transaction, passing it the cryptocurrency amount, send and recipient, which will be 
    //passed in from the body request of whoever will be calling this end point when they create a new transaction
    //This request will then return the block index (that will store the new transaction), as the response of the request
    const blockIndexToStoreNewTrans = testcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);

    //This request will then return the block index (that will store the new transaction), as the response of the request.
    //Will send this response as a json note.
    res.json({ note: `Transaction will be added in block index ${blockIndexToStoreNewTrans}.` });

    //When the POST request is made, we're printing out the Request Body in the console log. 
    //The Request Body is the data that we send with our post request 
    //to be stored in the backend (in the form of JSON), in this case our backend is the Blockchain.
    //This way when we make the POST request we can see what data we're going to store in the backend
    //printed out in the console log - in this case it's the new transaction made.
    /* console.log(req.body); */

    //In the response from request - in this case we're printing out the request body
    //specifically the 'amount' key-value pair (which is the cryptocurrency amount) 
    //in the request body JSON.
    //W're using string interpolation to print out the req.body.amount from the JSON.
    //You can test the end point 'localhost:3000/transaction' in postman, to see the resutls of
    //this end point. 
    //for more info on create 
    /*res.send(`The amount of the transaction is ${req.body.amount} testcoin`); */

    //for more info one how to create POST request, follow this Udemy video lesson:
    //https://www.udemy.com/build-a-blockchain-in-javascript/learn/v4/t/lecture/10399578?start=0
});

//This GET end point, once called, uses the proofOfWork method defined in the blockchain
//to create a new block. It also create a new tranaction to reward the node that mined the block. 
//finally it returns (i.e. the response will be) the success message that a new block is mined
//and returns the new Block info.
app.get('/mine', function(req, res) {
    const lastBlock = testcoin.getLastBlock();

    //hash property is accessed from the prototype "createNewBlock" instance method object
    //within which is newBlock, and inside it is a hash property. 
    const previousBlockHash = lastBlock['hash'];

    //For current block data we just included pending transaction and current block index.
    //This will then be hashed to create the current block's hash. 
    const currentBlockData = {
        transactions: testcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };

    const nonce = testcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = testcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    //Send a reward of 12.5 (cryptocurrency) to whoever mined the block.
    //The "sender" address of 00 in standard blockchain means it is sent 
    //as a reward. 
    testcoin.createNewTransaction(12.5, "00", nodeAddress);
    const newBlock = testcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    //Finally we return or send a response back of new mined block as a response
    //to whoever made the request
    res.json( {
        note: "New block mined successfully",
        block: newBlock
    });
});

//This whole express js server use to listen to port 3000.
//in previous git commits. Now we referenced the port as 
//a variable because we want to create more than one 
//instance of this networkNode.js api file (express server),
//where each instance will represent a node on the network.
//This is so to ensure there's no one node acting as the 
//express js server with the APIs, but the network is decentralised
//with more than one node acting as express js API server. 
//So to create more than one instance we need each new 
//instance to listen to a different port. Hence the port
//can't be hard-coded (3000) but a port proprty that 
//can be changed.
//We also passed a function to the listen method, 
//which will console log to output a message informing
//us when the server starts and our port is running, we 
//will be notified of the output console log text. 
//However, in the previous commits, we passed
//hard-coded string message purely. This time
//we want to change the hard-coded string of
//3000 and instead passed string interpolation
//passing the 'port' property to the string instead.
//hence we're change from single string quotes, to
//single back quotes to be able to pass property,
//as string interpolation.
//It should run port 3001 instead of 3000, because
//'port' property is referencing
//"start": "nodemon --watch dev -e js dev/api.js 3001" command in 
//package.json 
app.listen(port, function() {
    console.log(`Listening on port ${port}... `);
});