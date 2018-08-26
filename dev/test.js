//import Blockchain constructor function from blockchain.js file
const Blockchain = require('./blockchain');

//create a new, there no data in it and no blocks
const testcoin = new Blockchain();

/*First test 
    //running 'node dev/test' should print Blockchain with 2 blocks 
    //with the second block having the value of `[Array]` in the tranactions property 
    //However this output log won't actually show details of the transaction stored 
    //in block 2. To output the transaction detail you need to use the following line:

    //creating new block. We're just passing in what we want for now
    testcoin.createNewBlock(2899, 'WEQEQEQEQEW', 'RTRTRTRTRTRRTTR');

    //create new transaction, which will be added to the pending transaction array
    //because we have not mined or created a new block after creating this 
    //transaction
    testcoin.createNewTransaction(100, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');

    //create second block on the chain. The new transaction in the previous line
    //should be added to this block now
    testcoin.createNewBlock(12121221, 'ererereer', 'sdssdsdsdsds');
    //console.log(testcoin.chain[1]); as shown further down
    console.log(testcoin);
*/

/*Second test
    //will print the content of the second block in the chain
    // outputting the new transaction details
    //from ALEXSDF34R32Q to JENN2343FWDCADSC of 100
    //which is stored in block 2

    //create new transaction, which will be added to the pending transaction array
    //because we have not mined or created a new block after creating this 
    //transaction
    testcoin.createNewTransaction(100, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');

     //create new transaction, which will be added to the pending transaction array
    //because we have not mined or created a new block after creating this 
    //transaction
    testcoin.createNewTransaction(100, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');

    //create second block on the chain. The new transaction in the previous line
    //should be added to this block now
    testcoin.createNewBlock(12121221, 'ererereer', 'sdssdsdsdsds');
    console.log("\n -- print only second block with transaction details -- \n", testcoin.chain[1]);
*/

//create new mroe transactions which will be stored in pending transaction array
//testcoin.createNewTransaction(50, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');
//testcoin.createNewTransaction(300, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');
//testcoin.createNewTransaction(2000, 'ALEXSDF34R32Q', 'JENN2343FWDCADSC');

/*Third test
    //This time the blockchain will output in the logs of 2 block,
    //and the 3 newly created transactions will show in the 
    //pendingTransactions array because there's no new block that was
    //created after these new transactions (in order to store them)
    console.log(testcoin);
*/

/*Fourth test
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

/*Fifth test
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
*/

/*Sixth test
//Test the the proof of work method
//note there's no need to define and initialise a nonce
//for this method, as the whole point is for the mining 
//node to start from nonce value of 0 and keep trying 
//until it finds and returns the nonce for the valid hash
//which should starts with four zeros. In this case based
//on the given 'previousBlockHash' and 'currentBlockData' 
//that we have initialised, the nonce returned is 7339. 
//This means it took 7339 iterations of the while loop 
//the invokes the hasBlock method to find a hash that
//starts with four zeros.
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
];

console.log(testcoin.proofOfWork(previousBlockHash, currentBlockData));

//Based on the given 'previousBlockHash' and 'currentBlockData' 
//that we have initialised, the nonce returned is 7339.
//We can test with the hashBlock method now, passing 7339
//as the nonce and we should get back the same hash string
//that starts with four zeros.
console.log(testcoin.hashBlock(previousBlockHash, currentBlockData, 7339));
*/

//Seventh test
//To test the genesis block is being created
//when we simply create a new instance of the 
//Blockchain class
//console.log(testcoin)

//Eighth test
const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1535212080218,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1535212788713,
            "transactions": [],
            "nonce": 18140,
            "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
            "previousBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1535213892635,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "3e779490a87e11e89f0f295e26635148",
                    "transactionId": "e4c7ea60a87f11e89f0f295e26635148"
                },
                {
                    "amount": "200",
                    "sender": "SECONDE314141414",
                    "recipient": "BOND9070789798",
                    "transactionId": "24ab5a90a88011e89f0f295e26635148"
                },
                {
                    "amount": "100",
                    "sender": "SECONDE314141414",
                    "recipient": "BOND9070789798",
                    "transactionId": "34d4db60a88211e89f0f295e26635148"
                },
                {
                    "amount": "300",
                    "sender": "SECONDE314141414",
                    "recipient": "BOND9070789798",
                    "transactionId": "3be26df0a88211e89f0f295e26635148"
                }
            ],
            "nonce": 157893,
            "hash": "000014bb38a651949103e0dd054a855dbbcb811660ee21059d73724737e348b7",
            "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
            "index": 4,
            "timestamp": 1535214878899,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "3e779490a87e11e89f0f295e26635148",
                    "transactionId": "76c13af0a88211e89f0f295e26635148"
                },
                {
                    "amount": "10",
                    "sender": "11111111111",
                    "recipient": "2222222222",
                    "transactionId": "dac9c030a88211e89f0f295e26635148"
                },
                {
                    "amount": "20",
                    "sender": "11111111111",
                    "recipient": "2222222222",
                    "transactionId": "e960a500a88211e89f0f295e26635148"
                },
                {
                    "amount": "30",
                    "sender": "11111111111",
                    "recipient": "2222222222",
                    "transactionId": "ed871d30a88211e89f0f295e26635148"
                }
            ],
            "nonce": 26034,
            "hash": "0000d129d0161cd3189d5cd67f523216c8741cce9fd0f4346bea1231918d0308",
            "previousBlockHash": "000014bb38a651949103e0dd054a855dbbcb811660ee21059d73724737e348b7"
        },
        {
            "index": 5,
            "timestamp": 1535215139647,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "3e779490a87e11e89f0f295e26635148",
                    "transactionId": "c29cde50a88411e89f0f295e26635148"
                }
            ],
            "nonce": 59255,
            "hash": "0000cdf59f74d4a6dc0f0b915a0e7a10ab6611a6ffbc89ec0d70a1944417b578",
            "previousBlockHash": "0000d129d0161cd3189d5cd67f523216c8741cce9fd0f4346bea1231918d0308"
        },
        {
            "index": 6,
            "timestamp": 1535215154536,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "3e779490a87e11e89f0f295e26635148",
                    "transactionId": "5e09fdf0a88511e89f0f295e26635148"
                }
            ],
            "nonce": 149138,
            "hash": "0000b8e18026dfe0df07b36b281ee838be932f2cd487e8f9005cb6d818f5e650",
            "previousBlockHash": "0000cdf59f74d4a6dc0f0b915a0e7a10ab6611a6ffbc89ec0d70a1944417b578"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "3e779490a87e11e89f0f295e26635148",
            "transactionId": "66e7e3b0a88511e89f0f295e26635148"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
};

console.log('Valid chain: ', testcoin.chainIsValid(bc1.chain));