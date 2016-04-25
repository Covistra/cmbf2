import {Writable} from "stream";
import {PlatformLocator} from "../platform/platform-locator";
import {Platform} from "../platform/platform";
import * as P from "bluebird";
import {ServiceProxy} from "../platform/service-proxy";
import {LogRequest} from "../platform/requests/log-request";

export class PlatformStream extends Writable {
    private platform: P<Platform>;
    private logService: P<ServiceProxy>;

    constructor(cfg: any) {
        super();

        console.log("Instantiating a platform-stream");

        // Establish underlying connection to the platform
        this.logService = PlatformLocator.connect(cfg).then(function(platform) : P<ServiceProxy> {

            // Retrieve a logging service matching our needs. For performance,
            // we pre-resolve the service instead of relying on the platform capacity
            // to resolve services based on requests

            return platform.resolveService({
                group: 'system:monitor',
                action: "log"
            });

        }).catch( (error) => {
            console.error("Unable to resolve service system:monitor", error);
        });

    }

    _write(chunk: any, encoding: string, next) {

        if(this.logService) {
            // Record log using our logging service
            return this.logService.then((service: ServiceProxy) => {
                return service.exec(new LogRequest(chunk, encoding));
            })
            .then(function(result) {
                next(null, result);
                return null;
            }).catch(next);
        }
        else {
            console.log("OFFLINE: " + chunk.toString('utf8'));
        }

    }

}
