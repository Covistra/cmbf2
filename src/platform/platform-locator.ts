import * as P from "bluebird";
import {Platform} from "./platform";
import {HttpPlatformClient} from "./client/http-platform-client";
import {StreamPlatformClient} from "./client/stream-platform-client";
import {MessagingPlatformClient} from "./client/messaging-platform-client";

export enum PlatformProtocols { HTTP,  STREAM,  MESSAGING }

export interface PlatformLocatorOptions {
    protocol: PlatformProtocols,
    secure?: boolean,
    host?: string,
    port?: number,
    version
}

export class PlatformLocator {

    /**
     * Primary platform facade. Connect will establish a connection to the platform and return
     * a platform instance to perform operations.
     *
     * @param cfg PlatformLocatorOptions instance
     *
     * @returns {Promise<Platform>|Promise}
     */
    static connect(cfg?: PlatformLocatorOptions) : P<Platform> {
        cfg = cfg || {protocol: PlatformProtocols.STREAM, secure: false, host: 'localhost', port: 25025, version: 1 };

        return new P<Platform>((resolve, reject) => {
            var impl = null;

            switch(cfg.protocol) {
                case PlatformProtocols.HTTP:
                    impl = new HttpPlatformClient(cfg.host, cfg.port, { secure: cfg.secure, version: cfg.version });
                    break;
                case PlatformProtocols.STREAM:
                    impl = new StreamPlatformClient(cfg.host, cfg.port, { secure: cfg.secure, version: cfg.version });
                    break;
                case PlatformProtocols.MESSAGING:
                    impl = new MessagingPlatformClient(cfg.host, cfg.port, { secure: cfg.secure, version: cfg.version });
                    break;
            }

            resolve(impl);
        });

    }

}
