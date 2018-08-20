//We're using 'express' which is a node JS library, to create
// a server with APIs. To run/start the server, run the command:
//'npm run node_1', based on this configuration, where, our command 
// to start this network node (or this express server), the specified 
//command configuration in 'package.json' is: 
//"node_1": "nodemon --watch dev -e js dev/networkNode.js 3001" 
//So the command to start the network node (or express server) is "npm run node_1" 
//Please be aware if you installed nodemon globally on your system rather locally 
//the command would be different. In this project we installed nodemon locally, 
//using 'npm i nodemon --save' bash command.  
//Then to call an api/route, which will be localhost and 
//the port will be whatever the port const is set to.
//The 'const port = process.argv[2];' is referencing port number specified in
//package.json: "node_1": "nodemon --watch dev -e js dev/networkNode.js 3001" 
//in this case 3001.  
//If type the URL: localhost:3001  into a browser, 
//this will return the GET api response we have.
//If you change any api and its response. You need to stop the express
//server (Ctrl+C). Then start it gain: node dev/networkNode.js 
//(or if you haven't installed nodemon then: 'node dev/networkNode.js), 
//to see the changes.
//To run multiple instances of network nodes, to simulate a decentralised 
//blockchain network, we have created in 'package.json' file, more node 
//start commands (each with a different node start command incremented, as
//well as the port numbers are incremented too, i.e.:
//"node_1": "nodemon --watch dev -e js dev/networkNode.js 3001",
//"node_2": "nodemon --watch dev -e js dev/networkNode.js 3002",
//"node_3": "nodemon --watch dev -e js dev/networkNode.js 3003",
//So to run multiple instances of node, open different terminal windows,
//and each terminal run 'npm run nod_1', then in the next terminal window 
//'npm run nod_2' ...etc. 

//'nodemon' npm module is also added. This will help in automatically restarting
//our express server application automatically whenever a change in the code 
//in our 'networkNode.js' file takes place. This is made possible by also adding the 
//"start": "nodemon --watch dev -e js dev/networkNode.js" script in the 'package.json' file
//So now we can simply run the command 'npm start', to start our express server,
//and whenever we change any code in the 'networkNode.js' file, it will automatically 
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

//reference to 'request-promise' npm module which allows us to 
//to request different nodes on the network using endpoints.  
const requestPromise = require('request-promise'); 
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

//The first Endpoint to be called as part of the 3 step process of 
//registering a new node on the blockchain network.
//This endpoint must be called on an existing node on the network 
//which will register the new node on its
//server and then it's going to broadcast this new node to all
//of the other nodes on the blockchain network. 
//We will send the URL of the new node that we want
//to add to our network via the request body.
//We will then do some calculations and then broadcast it
//to the whole network so that other nodes can it add/register it as well.
//Explanation here: https://www.udemy.com/build-a-blockchain-in-javascript/learn/v4/t/lecture/10399640?start=0
app.post('/register-and-broadcast-node', function(req, res) {
    //reference the new node URL from the request body.
    const newNodeURL = req.body.newNodeURL;
    //will check if the new node URL does not exist on the array of existing network nodes
    //then push/add the new node URL to the array of existing nodes
    //on the network. == -1 means it's not within the array index range
    //(i.e. not part of the array). This is the first step where the new node
    //is now registered with the current network node that is running this API endpoint
    //and registering our new node.
    if (testcoin.networkNodes.indexOf(newNodeURL) == -1) testcoin.networkNodes.push(newNodeURL);
    

    //define an array to store all of our returned promises
    //from each request we make for each of our nodes to register 
    //the new node, in the line below
    const registerNodesPromises = [];
    //Iterate through all of our existing nodes in our blockchain network.
    //For each network node that is already present on the network
    //(i.e. inside of our networkNodes array) we want to register,
    //our new node URL with each of these nodes, by calling the 
    //'register-node' endpoint. We're going to make a request to
    //every network node at the 'register-node' endpoint.
    //This step is where we're actually broadcasting the new
    //node to the other nodes in the network.
    testcoin.networkNodes.forEach(networkNodeURL => {
        //use '/register-node' endpoint on each network node
        //define the options that we want to use
        //in each of our http requests
        const requestOptions = {
            //we want to all the URI (or URL) of the '/register-node' endpoint
            //on each of our network nodes URL
            uri: networkNodeURL + '/register-node',
            //next we want to specify the type http method that we want to use (i.e. post)
            method: 'POST',
            //next we want to specify what data want to include in the request body
            //which is the newNodeURL, to inform every node of the new node URL
            body: { newNodeURL: newNodeURL },
            //we want to send the data inside the body as json format
            json: true
        };

        //now we want to use the request options we defined above inside our 
        //request promise. This request is going to return to us a promise. 
        //We want to get all these promises for all the nodes requests  
        //stored back in a single array.
        //All of these requests are going to be asynchronous,
        //which means we don't know when we're going to receive 
        //the response data back from the request, because we're
        //trying to reach an outside source (which is the other nodes
        //in our network). Because we don't know when the response 
        //will be returned, so we store all of these requests (promises)
        //inside an array then we will run the entire array, where once we
        //receive the response data back from each request, we use this data.
        registerNodesPromises.push(requestPromise(requestOptions));
    });

    //Once returned, all the promises (i.e. network requests) 
    //we want to run them now. Once all of our requests have finished
    //without any errors, we can assume that the new node URL has been registered
    //with all of our network nodes successfully. 
    //So after our broadcast is complete the next thing that we want to do
    //is register all of the network nodes present in the network with our new 
    //node. We do this inside the response returned data handler below, 
    //where we now request the new node to call
    //the '/register-nodes-bulk' endpoint to register all the other network nodes 
    //with it. The response we get from this second request, we use another '.then' statement
    //to wait for this response (which is the last response of these series of chained async http calls)
    //where inside the response data handler we simply send a response back to whoever called the endpoint 
    //to notify that: 'New node registered with network successfully'.
    Promise.all(registerNodesPromises)
    .then(data => {
        //Receiving our response data indicates that by this point
        //the new node has already been broadcasted and registered with each 
        //of the network nodes iteration. Now that we got back the data response from
        //each promise/request, now we have to do, is register all the nodes currently inside
        //of our network with the one new node that we're adding to the network. Therefore we're 
        //going to request the new node URL to call the third endpoin: '/register-nodes-bulk'

        //we need to define some options for our request.
        //In the request body, we're sending all the other
        //network nodes URLs plus the network node that we're 
        //currently on where we're making our API requests.
        //Note, we're passing our networkNodes array inside 
        //an array, but we need to use the spreader operator (...)
        // as we need to spread our networkNodes elements inside of 
        //the outer array and not pass the networkNodes array inside
        //the outer array directly, otherwise we won't have access to 
        //each element in the array directly. 
        const bulkRegisterOptions = {
            uri: newNodeURL + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodesURLs: [ ...testcoin.networkNodes, testcoin.currentNodeUrl ] },
            json: true
        };

        //return and run the request/promise which is 
        //'/register-nodes-bulk' made by the new node.
        return requestPromise(bulkRegisterOptions)
    })
    .then(data => {
        //In the returned response from 'requestPromise(bulkRegisterOptions)'
        //which is returned request/promise from the request 
        //'/register-nodes-bulk' made by the new node, we simply
        //want to send a response to the node that called the endpoint.
        res.json({ note: 'New node registered with network successfully.' });
    });
});

//The second Endpoint to be called as part of the 3-steps process of 
//registering a new node on the blockchain network.
//This endpoint will be used by each of the nodes on the network 
//(except the node that initially registered and broadcasted the new node on the network)
//to register the new node with the network, from the broadcast they
//will receive from the network node making the api endpoit call to register
//and broadcast the new node.
//The difference between this endpoint and the 
//first end point: '/register-and-broadcast-node'
//is that this endpoint will need to be called,
//simply to enable all the other nodes on the network 
//to accept the new network node, inside of this endpoint.
//So this endpoint should be called by the other endpoint
//'/register-and-broadcast-node' for each node in the network to 
//register the new node. The first endpoint is only called by the node that will register 
//and broadcast the new node to the entire network). 
//So this endpoint only ensures the other nodes on the network register the new node. We do not 
//want them to broadcast the new node, because the new node has already
//been broadcast. If all the other nodes in the network were to broadcast
//the new node as well, that would severely degrade the performance of our 
//blockchain network and would lead to an infinite loop that would crash 
//the blockchain. 
//So when all the other nodes on the network receive the URL of the new node
//we just want them to register it.
//Explanation here: https://www.udemy.com/build-a-blockchain-in-javascript/learn/v4/t/lecture/10399640?start=0
app.post('/register-node', function(req, res) {
    //store the new node URL from the request body that we 
    //send to this endpoint, inside a property
    const newNodeURL = req.body.newNodeURL;
    //Error handling here: if the new node URL does not exist inside
    //our network nodes then 'const nodeNotAlreadyPresent' will be true, otherwise
    //it will be false (if the new node URL does exist).
    //Then in the if statement we check the bool 'nodeNotAlreadyPresent' 
    //if it's true we add the new node URL inside the blockchain copy
    //of this node that is making the call to this endpoint.
    //I.e. this now registers the new node, with the network
    //node that is making this api endpoint request.
    const nodeNotAlreadyPresent = testcoin.networkNodes.indexOf(newNodeURL) == -1;
    //Also checking that the new node URL is also not the current node calling this API
    //endpoint. Because the node calling this endpoint is obviously not included
    //in the 'networkNodes' array (i.e. its own copy of the blockchain or network of nodes).
    //If they do not equal each other, then 'notCurrentNode' evaluate to true.
    const notCurrentNode = testcoin.currentNodeUrl !== newNodeURL;
    if (nodeNotAlreadyPresent && notCurrentNode) testcoin.networkNodes.push(newNodeURL);
    //send response back to the network node to inform the new node
    //is registered successfully with it.
    res.json({ note: 'New node regsitered successfully.' });
});

//The third Endpoint to be called as part of the 3 step process of 
//registering a new node on the blockchain network.
//This endpoint is called by the same network node that registered
//and broadcasted the new node to the network (using the /register-and-broadcast-node' endpoint,
//which is the first step of the 3-steps process of registering a new node on the network), 
//which is going to make a request to the new node, passing the URLs of all the other existing 
//nodes on the network with this endpoint request to the new node.
//This endpoint call will register all the existing nodes on the network with our new node. 
//Doing so the new node will be part of the network, completing the 3-steps regsiteration process
//of a new node. Call this endpoint will also ensures each of the nodes on the network will be 
//aware of all the other nodes on the network. 
//Explanation here: https://www.udemy.com/build-a-blockchain-in-javascript/learn/v4/t/lecture/10399640?start=0
app.post('/register-nodes-bulk', function(req, res) {

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