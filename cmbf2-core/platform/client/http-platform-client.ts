
import {Platform} from "../platform";
import {CapabilityQuery} from "../capability-query";
import {ServiceProxy} from "../service-proxy";
import * as P from "bluebird";
import {ServiceRequest} from "../service-request";

export interface HttpPlatformOptions {
    secure?: boolean,
    version?: number
}

export class HttpPlatformClient implements Platform {
    private host: string;
    private port: number;
    private options: HttpPlatformOptions;

    constructor(host: string, port: number, options: HttpPlatformOptions ) {
        this.host = host;
        this.port = port;
        this.options = options || { secure: false, version: 1 };
    }

    resolveService(query:CapabilityQuery): P<ServiceProxy> {
        return undefined;
    }

    send(request:ServiceRequest):P<any> {
        return undefined;
    }

    exec(request:ServiceRequest):P<any> {
        return undefined;
    }

    broadcast(request:ServiceRequest):P<any> {
        return undefined;
    }

    head(request:ServiceRequest):P<any> {
        return undefined;
    }

}