
import {CentralLogger} from "./central-logger";

export class SystemLogger {
    static logger: CentralLogger;

    static get() {
        if(!this.logger) {
            this.logger = new CentralLogger();
        }
        return this.logger;
    }
}
