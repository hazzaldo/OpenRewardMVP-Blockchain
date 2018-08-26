
const sha256 = require('sha256');
//referencing the start server commands defined in 'package.json':
//"node_1": "nodemon --watch dev -e js dev/networkNode.js 3001 http://localhost:3001"
//and all the other nodes start commands i.e. node_2, node_3 ..etc. 
//Specifically it is referencing the 4th variable in the command (argv[3] is index 4 in 0-indexed array)
//which is the node's url e.g. http://localhost:3001. 
//So now we should have access tothe current node's URL by using this variable. 
const currentNodeUrl = process.argv[3];

//This will be used to create unique IDs, such as transactionID for every 
//transaction
const uuid = require('uuid/v1');

//I created constructor function over a class (just my preference), because in Javascript there really are no classes
//Classes in Javascript are simply a kind of sugar coating on top of constructor functions and the object prototype.
//So I simply prefer to stick with constructor function themselves.
//We could use a class instead if another developer prefers. You can delete the constructor function and 
//uncomment the code below:
/*
class Blockchain {
	consructor() {
		this.chain = [];
		this.newTransactions = [];
	}
	//methods
}
*/
function Blockchain() {
	//all blocks that we create and mine will be stored in this array as chain
	this.chain = [];
	//here we will hold all the newly created trasactions before they're placed inside a block that is mined
	this.pendingTransactions = [];

	//We want to assign the current node URL to our blockchain data structure.
	this.currentNodeUrl = currentNodeUrl;

	//An array with all the nodes currently on the network
	//so that our blockchain is always aware of all the nodes 
	//inside our blockchain network.
	this.networkNodes = [];

	//create the gensis block. We will not have niether - nonce
	//previousBlockHash or Hash params to provide. So we'll simply
	//pass arbitrary params. We'll pass a nonce 100, previousBlockHash 
	//of string 0 and a hash of string 0 as well.
	//Important: it's only allowed to pass arbitrary values for 
	//the Genesis block. Any blocks after that we'll have to pass
	//legitimate values as params in order for the blockchain
	//to work properly.
	this.createNewBlock(100, '0', '0');
}

//a function to create new block on our Blockchain prototype object. 
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
	//All the data that we need is going to be stored nside of this block
	const newBlock = {
		//Block number - i.e. what number of block this is in our chain
		index: this.chain.length + 1,
		//timestamp - because we want to know when the block was created
		timestamp: Date.now(),
		//when we create a new block, we are going to want to put all of the new transactions 
		//or all of the pending transactions that have just been created into this new block
		//so that they're inside our blockchain and they cannot be changed
		//so all awaiting new transactions will be placed in this block
		transactions: this.pendingTransactions,
		//this will be equal to nonce parameter that we have passed into this function
		//A nonce comes from a proof of work. In our case it's simply a number. It could be any number
		//This nonce is a proof that we created this new block in a legitimate way by using 
		//a proof of work method.   
		nonce: nonce,
		//the hash will be equal to the `hash` parameter that we pass into this function, 
		//The hash will be the data from our new block. We're going to pass our 
		//new transactions into a hashing function to output a single string code
		hash: hash,
		//this will be equal to the parameter `previousBlockHash` that we pass to this function
		previousBlockHash: previousBlockHash

	};

	//set the newTransactions to an empty array. Because once we create a new block
	//we putting all of the new transactions into the new block. So we want to 
	//clear out this entire `newTransactions` array, so we can start over for the 
	//next block.
	this.pendingTransactions = [];
	//takes the new block that we created and pushes it into our chain, and adds it to our chain.
	this.chain.push(newBlock);

	return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
	return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient,
		transactionId: uuid().split('-').join('')
	};

	return newTransaction;
};

//takes a transaction object and adds it to the pending transactions array
Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
	this.pendingTransactions.push(transactionObj);

	//returns the index of the next block (when it's mined) that our pending transactions will be stored in
	return this.getLastBlock()['index'] + 1;
};

//Hashing method - takes a block from the blockchain and hash it into some fixed length string
//that to us will appear random. The block previous block hash, current block data and nonce 
//will be passed as a params, combined into one string constant and the method returns
//some fixed length string, from all the 3 data pieces we passed, using SHA256
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
	//currentBlockData will an array of transactions or some kind of JSON data object
	//the JSON.stringify simply turns the data into a string. nonce will be a integer
	//so it needs to be converted to string. 
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData) 
	const hash = sha256(dataAsString);
	return hash;
}

//Proof of work method - which makes a node (miner's machine)
//continuously run the hashBlock method, incrememnting the nonce
//until a hash is returned that starts with fours zeros, which is
//the blockchain's condition for proof of work acceptance.
//This could take time and uses a lot of energy from the node.
//Once the valid hash is returned, the nonce responsible for 
//that valid hash is returned.
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
	//define a nonce. Unlike const, let is a variable
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
	while (hash.substring(0, 4) !== '0000') {
		nonce++;
		hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	}

	return nonce;
}

Blockchain.prototype.chainIsValid = function(blockchain) {
	let validChain = true;
	//Iterating through the blockchain of the node, and checking for 2 things
	//We're checking to see if the previous block hash matches the current block's
	//previousBlockHash property (i.e. they align properly). It also checks that the hashed block data starts 
	//with four zeros (0000). 
	//We also check a valid Genesis block separately, outside of the for loop (which loops through all the blocks)
	//In the blockchain except the genesis block (which we created ourselves so it needs to have a different validation check)
	//For genesis block we check a valid: nonce, previous block hash, current block hash and transactions
	for (var i = 1; i < blockchain.length; i++) {
		const currentBlock = blockchain[i];
		const previousBlock = blockchain[i -1];
		
		const blockHash = this.hashBlock(previousBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
		const validBlockHash = (currentBlock['previousBlockHash'] == previousBlock['hash']);
		const validNonce = blockHash.substring(0, 4) == '0000';
		if (!validBlockHash || !validNonce) validChain = false;
		console.log('previousBlockHash =>', previousBlock['hash']);
		console.log('currentBlockHash =>', currentBlock['hash']);
	};

	const genesisBlock = blockchain[0];
	const validGenesisNonce = genesisBlock['nonce'] === 100;
	const validGenesisPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
	const validGenesisBlockHash = genesisBlock['hash'] === '0';
	const validGenesisBlockTransactions = genesisBlock['transactions'].length === 0;
	if (!validGenesisNonce || !validGenesisPreviousBlockHash || !validGenesisBlockHash || !validGenesisBlockTransactions) validChain = false;

	return validChain;
};

//export Blockchain constructor function to be accessible 
//by other js files
module.exports = Blockchain;