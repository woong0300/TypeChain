"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "20202020", "", "Hello", 123456);
let blockchain = [genesisBlock];
const getBlockChain = () => blockchain;
const getLastestBlock = () => blockchain[blockchain.length - 1];
const getNextTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLastestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNextTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLastestBlock())) {
        blockchain.push(candidateBlock);
    }
};
// blockchains.push("Next Stuff");
//이런 실수가 발생하지 않는다. block객체가 아니여서 컴파일이 되지 않는다
//이걸 미리 알 수 있는 것이 typescript의 장점!!
createNewBlock("Second Block");
createNewBlock("Third Block");
createNewBlock("Fourth Block");
createNewBlock("Fifth Block");
console.log(blockchain);
// 이 파일이 모듈이 된다는 것을 알려줘야 되는 TypeScript문법
//# sourceMappingURL=index.js.map