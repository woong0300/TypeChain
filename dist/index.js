"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock = new Block(0, "20202020", "", "Hello", 123456);
let blockchains = [genesisBlock];
blockchains.push("Next Stuff");
//이런 실수가 발생하지 않는다. block객체가 아니여서 컴파일이 되지 않는다
//이걸 미리 알 수 있는 것이 typescript의 장점!!
console.log(blockchains);
// 이 파일이 모듈이 된다는 것을 알려줘야 되는 TypeScript문법
//# sourceMappingURL=index.js.map