//import Blockchain constructor function from blockchain.js file
const Blockchain = require('./blockchain');

//create a new, there no data in it and no blocks
const testcoin = new Blockchain();

//creating new block. We're just passing in what we want for now
testcoin.createNewBlock(2899, 'WEQEQEQEQEW', 'RTRTRTRTRTRRTTR');

//create new transaction, which will be added to the pending transaction array
//because we have not mined or created a new block after creating this 
//transaction
testcoin.createNewTransaction(100, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');

testcoin.createNewBlock(12121221, 'ererereer', 'sdssdsdsdsds');
//running 'node test.js' will print Blockchain with empty chain 
//and empty newTrasnactions
console.log(testcoin);