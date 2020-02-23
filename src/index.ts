import * as CryptoJS from "crypto-js";

class Block{
    static calculateBlockHash = (
        index:number, 
        previousHash:string,
        timestamp: number,
        data:string
    ): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock:Block) : boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";
    
    //static들이 위에 먼저 있고 그 아래에 나머지가 있는 구조가 일반적
    
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
           
}

const genesisBlock: Block = new Block(0, "20202020", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockChain = () : Block[] => blockchain;

const getLastestBlock = (): Block => blockchain[blockchain.length - 1];

const getNextTimeStamp = (): number => Math.round(new Date().getTime() / 1000);


const createNewBlock = (data:string) : Block =>{
    const previousBlock: Block = getLastestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp : number = getNextTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash, 
        newTimeStamp, 
        data
    );
    const newBlock: Block = new Block(
        newIndex, 
        newHash, 
        previousBlock.hash, 
        data, 
        newTimeStamp
    );
    addBlock(newBlock);
    return newBlock;

};

const getHashForBlock = (aBlock: Block) :string => 
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    );

const isBlockValid = (candidateBlock:Block, previousBlock:Block): boolean =>{
    if(!Block.validateStructure(candidateBlock)){
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    } else if(getHashForBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    } else{
        return true;
    }
};

const addBlock = (candidateBlock: Block) : void => {
    if(isBlockValid(candidateBlock, getLastestBlock())){
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


//sayHi(name,age); 이거와 같이 argument 하나를 빼면 동작이 안되게 되어있어
//typescript가 발생할 수 있는 실수들을 막아준다. argument에 ?를 붙여주면 
//gender에 undefined가 뜨고 어느 부분이 빠지는지 알려준다.
export {};
// 이 파일이 모듈이 된다는 것을 알려줘야 되는 TypeScript문법