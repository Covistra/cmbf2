import {Writable} from "stream";
import {PlatformLocator} from "../platform/platform-locator";
import {Platform} from "../platform/platform";
import * as P from "bluebird";
import {ServiceProxy} from "../platform/service-proxy";

export class PlatformStream extends Writable {
    private platform: P<Platform>;
    private logService: P<ServiceProxy>;

    constructor(cfg: any) {
        super();

        // Establish underlying connection to the platform
        this.platform = PlatformLocator.connect(cfg).then((platform) => {

            // Retrieve a logging service matching our needs. For performance,
            // we pre-resolve the service instead of relying on the platform capacity
            // to resolve services based on requests

            this.logService = platform.resolveService({
                group: 'system:monitor',
                action: "log"
            });

            return platform;
        });

    }

    _write(chunk: any, encoding: string, next) {

        // Record log using our logging service
        this.logService.then((service: ServiceProxy) => {
            return service.exec({
                action: 'log',
                payload: {
                    data: chunk,
                    encoding: encoding
                }
            });
        })
        .then(function(result) {
            return next(null, result);
        }).catch(next);

    }

}
