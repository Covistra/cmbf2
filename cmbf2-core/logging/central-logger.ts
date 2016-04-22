
import {Logger} from "./logger";
import * as bunyan from "bunyan";
import {PlatformStream} from "./platform-stream";

export class CentralLogger implements Logger {
    private root : any;
    private platformStream: PlatformStream;

    constructor(cfg?: any) {
        cfg = cfg || {};
        this.platformStream = new PlatformStream(cfg);
        this.root = bunyan.createLogger({
            name: 'system',
            streams: [{
                type: 'stream',
                level: cfg.level || 'info',
                stream: this.platformStream
            }]
        });
    }

    trace() {
        return this.root.trace.apply(this.root, arguments);
    }

    debug() {
        return this.root.debug.apply(this.root, arguments);
    }

    info() {
        return this.root.info.apply(this.root, arguments);
    }

    warn() {
        return this.root.warn.apply(this.root, arguments);
    }

    error() {
        return this.root.error.apply(this.root, arguments);
    }

    fatal() {
        return this.root.fatal.apply(this.root, arguments);
    }
    
}
