
const sha256 = require('sha256');

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
		recipient: recipient
	};

	this.pendingTransactions.push(newTransaction);
	//returns the index of the next block (when it's mined) that our new transaction will be stored in
	return this.getLastBlock()['index'] + 1;
}

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

//export Blockchain constructor function to be accessible 
//by other js files
module.exports = Blockchain;