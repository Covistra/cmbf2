
import {CentralLogger} from "./central-logger";

export class SystemLogger {
    static logger: CentralLogger;

    static get() {
        if(!this.logger) {
            this.logger = new CentralLogger({host: '127.0.0.1', port: 9050});
        }
        return this.logger;
    }
}
