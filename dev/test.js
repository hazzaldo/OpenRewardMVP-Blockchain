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

/*First test print out:
    //running 'node dev/test' should print Blockchain with 2 blocks 
    //with the second block having the value of `[Array]` in the tranactions property 
    //However this output log won't actually show details of the transaction stored 
    //in block 2. To output the transaction detail you need to use the following line:
    //console.log(testcoin.chain[1]); as shown further down
    console.log(testcoin);
*/

/*Second test print out:
    //will print the content of the second block in the chain
    // outputting the new transaction details
    //from ALEXSDF34R32Q to JENN2343FWDCADSC of 100
    //which is stored in block 2
    console.log("\n -- print only second block with transaction details -- \n", testcoin.chain[1]);
*/

//create new mroe transactions which will be stored in pending transaction array
//testcoin.createNewTransaction(50, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');
//testcoin.createNewTransaction(300, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');
//testcoin.createNewTransaction(2000, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');

/*Third test print out:
    //This time the blockchain will output in the logs of 2 block,
    //and the 3 newly created transactions will show in the 
    //pendingTransactions array because there's no new block that was
    //created after these new transactions (in order to store them)
    console.log(testcoin);
*/

/*Fourth test print out:
    //We'll create a new block to store the 3 newly created 
    //transactions in the previous lines
    testcoin.createNewBlock(9898989898, 'AAAAAAAA', 'BBBBBBB');
    //this should output a blockchain with third block which will 
    //store the 3 newly created transactions in the previous lines
    console.log(testcoin);

    //this console output will take a more detailed look at the 
    //third block, printing out the transactions inside it
    console.log(testcoin.chain[2]);
*/

//Fifth test print out
//In this test we will be testing the 'hashBlock' method
//to make sure the data params we pass to the method returns
// a hash string. And if you change one single character from
//any of the params it should change the hash string output 
//completely
const previousBlockHash = 'OWEDWDWE0E0W0300232032';
const currentBlockData = [
    {
        amount: 10,
        sender: 'JOHN90EEREDFDFDFF2',
        recipient: 'TOMFSDFSDFSDSCCV',
    },
    {
        amount: 30,
        sender: 'JENN32EWEWDWD',
        recipient: 'JULIA09DFSDFSDSCCV',
    },
    {
        amount: 200,
        sender: 'JENN32EWEWDWD',
        recipient: 'JULIA09DFSDFSDSCCV',
    },
]
const nonce = 100; 

console.log(testcoin.hashBlock(previousBlockHash, currentBlockData, nonce));