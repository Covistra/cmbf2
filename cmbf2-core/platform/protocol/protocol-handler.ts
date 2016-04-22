
import PSON = require('pson');

export class ProtocolHandler {
    private version: number;
    private pson: PSON.ProgressivePair;

    constructor(version?: number) {
        this.version = version || 1;
        this.pson = new PSON.ProgressivePair();
    }

    encode(message: any) : Buffer {
        return this.pson.encode(message);
    }

    decode(buffer: Buffer): any {
        return this.pson.decode(buffer);
    }
}
