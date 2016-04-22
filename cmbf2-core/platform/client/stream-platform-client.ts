
import {Platform} from "../platform";
import {CapabilityQuery} from "../capability-query";
import {ServiceProxy} from "../service-proxy";
import * as P from "bluebird";
import {ServiceRequest} from "../service-request";
import {client as Client} from "websocket";
import {Logger} from "../../logging/logger";
import {SystemLogger} from "../../logging/system-logger";
import {PromiseUtils} from '../../util/promise-utils';
import {ProtocolHandler} from "../protocol/protocol-handler";

export interface StreamPlatformOptions {
    secure?: boolean,
    version?: number
}

export class StreamPlatformClient implements Platform {
    private host: string;
    private port: number;
    private options: StreamPlatformOptions;
    private socket: Client;
    private logger: Logger;
    private conn: P<any>;
    private connResolver: PromiseUtils.Resolver<any>;
    private connRejecter: PromiseUtils.Rejecter<Error>;
    private protocolHandler: ProtocolHandler;

    constructor(host: string, port: number, options: StreamPlatformOptions ) {
        this.host = host;
        this.port = port;
        this.options = options || { secure: false, version: 1 };
        this.protocolHandler = new ProtocolHandler(this.options.version || 1);
    }

    initialize() {
        this.logger = SystemLogger.get();

        // Create the web socket
        this.socket = new Client();
        this.conn = new P((resolve, reject) => {
            this.connResolver = resolve;
            this.connRejecter = reject;
        });

        this.socket.on('connectFailed', (error: Error) => {
            this.logger.error("Platform stream connection failed:", error);
            this.connRejecter(error);
        });

        this.socket.on('connect', (conn: any) => {
            this.logger.debug("Connected to stream");

            conn.on('error', this.handleConnectionError);

            this.connResolver(conn);
        });
    }

    protected handleConnectionError(error: Error) {
        this.logger.debug("Connection error", error);
    }

    protected connection() : P<any> {
        return this.conn;
    }

    resolveService(query:CapabilityQuery): P<ServiceProxy> {
        return this.conn.then((connection: any) => {



            return new P<ServiceProxy>(function(resolve) {
                // Marshall the query
                var payload = this.protocolHandler.encode(query);

                console.dir(payload);
                resolve();
            });
        });
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
