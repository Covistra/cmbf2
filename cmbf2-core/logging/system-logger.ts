
import {CentralLogger} from "./central-logger";

export class SystemLogger {
    static logger: CentralLogger;

    static get() {
        if(!this.logger) {
            this.logger = new CentralLogger({host: 'localhost', port: 9050});
        }
        return this.logger;
    }
}
