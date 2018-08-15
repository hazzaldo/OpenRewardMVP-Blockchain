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

//create second block on the chain. The new transaction in the previous line
//should be added to this block now
testcoin.createNewBlock(12121221, 'ererereer', 'sdssdsdsdsds');

//running 'node dev/test' should print Blockchain with 2 blocks 
//with the second block having the value of `[Array]` in the tranactions property 
//However this output log won't actually show details of the transaction stored 
//in block 2. To output the transaction detail you need to use the following line:
//console.log(testcoin.chain[1]); as shown further down
console.log(testcoin);

//will print the content of the second block in the chain
// outputting the new transaction details
//from ALEXSDF34R32Q to JENN2343FWDCADSC of 100
//which is stored in block 2
console.log("\n -- print only second block with transaction details -- \n", testcoin.chain[1]);