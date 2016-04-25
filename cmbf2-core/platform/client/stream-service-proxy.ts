
import {ServiceProxy} from "../service-proxy";
import {ServiceRequest} from "../service-request";
import * as P from "bluebird";
import {ServiceResponse} from "../service-response";
import {Platform} from "../platform";
import {connection as WebSocketConnection} from "websocket";

export interface ProxySpec {
    serviceId: string;
}

export class StreamServiceProxy implements ServiceProxy {
    private platform : Platform;
    private conn: WebSocketConnection;
    private uuid: string;
    private spec: ProxySpec;

    constructor(platform: Platform, conn: WebSocketConnection, proxySpec: ProxySpec) {
        this.platform = platform;
        this.conn = conn;
        this.uuid = proxySpec.serviceId;
        this.spec = proxySpec;
    }

    exec(request: ServiceRequest): P<ServiceResponse> {

        // Enforce that this service is our target
        request.service = this.uuid;

        return this.platform.exec(request);
    }

    send(request: ServiceRequest): void {

        // Enforce that this service is our target
        request.service = this.uuid;

        this.platform.send(request);
    }

}
