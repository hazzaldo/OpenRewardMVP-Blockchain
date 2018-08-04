
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
	this.newTransactions = [];
}