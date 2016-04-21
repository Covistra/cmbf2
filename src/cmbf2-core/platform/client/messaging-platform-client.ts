import {Platform} from "../platform";
import {CapabilityQuery} from "../capability-query";
import {ServiceProxy} from "../service-proxy";
import * as P from "bluebird";
import {ServiceRequest} from "../service-request";

export interface MessagingPlatformOptions {
    secure?: boolean,
    version?: number
}

export class MessagingPlatformClient implements Platform {
    private host: string;
    private port: number;
    private options: MessagingPlatformOptions;

    constructor(host: string, port: number, options: MessagingPlatformOptions ) {
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