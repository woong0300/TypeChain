class Block{
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

const genesisBlock:Block = new Block(0, "20202020", "", "Hello", 123456);

let blockchains: [Block] = [genesisBlock];

blockchains.push("Next Stuff");
//이런 실수가 발생하지 않는다. block객체가 아니여서 컴파일이 되지 않는다
//이걸 미리 알 수 있는 것이 typescript의 장점!!

console.log(blockchains);


//sayHi(name,age); 이거와 같이 argument 하나를 빼면 동작이 안되게 되어있어
//typescript가 발생할 수 있는 실수들을 막아준다. argument에 ?를 붙여주면 
//gender에 undefined가 뜨고 어느 부분이 빠지는지 알려준다.
export {};
// 이 파일이 모듈이 된다는 것을 알려줘야 되는 TypeScript문법