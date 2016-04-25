
import {Platform} from "../platform";
import {CapabilityQuery} from "../capability-query";
import {ServiceProxy} from "../service-proxy";
import * as P from "bluebird";
import {ServiceRequest} from "../service-request";
import {client as Client, connection as WebSocketConnection} from "websocket";
import {Logger} from "../../logging/logger";
import {SystemLogger} from "../../logging/system-logger";
import {PromiseUtils} from "../../util/promise-utils";
import {ProtocolHandler} from "../protocol/protocol-handler";
import {ResolveServiceRequest} from "../requests/resolve-service-request";
import {ServiceResponse} from "../service-response";
import {ResponseHandler} from "../protocol/response-handler";
import {StreamServiceProxy} from "./stream-service-proxy";
import {ServiceExecutionPlan} from "../service-execution-plan";

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
    private responseHandlers: any;

    constructor(host: string, port: number, options: StreamPlatformOptions ) {
        this.host = host;
        this.port = port;
        this.options = options || { secure: false, version: 1 };
        this.protocolHandler = new ProtocolHandler(this.options.version || 1);
        this.responseHandlers = {};
        this.conn = new P((resolve, reject) => {
            this.connResolver = resolve;
            this.connRejecter = reject;
        });

        this.conn.catch(function(err) {
            console.log("Unable to connect to the platform. Stream will not be available", err);
        });

    }

    initialize() {
        let retries : number = 0;
        let max_retries : number = process.env.NODE_ENV === 'production' ? 5 : 1;

        this.logger = SystemLogger.get();

        // Create the web socket
        this.socket = new Client();

        this.socket.on('connectFailed', (error: Error) => {
            console.log("Platform is not available yet. Retrying in 2 seconds");
            retries++;

            if(retries <= max_retries) {
                setTimeout(() => {
                    // Establish connection to the platform
                    this.socket.connect('ws://'+this.host+":"+this.port, "v1");

                }, 2000);
            }
            else {
                this.connRejecter(error);
            }
        });

        this.socket.on('connect', (conn: any) => {
            console.log("Connected to stream");
            conn.on('error', this.handleConnectionError.bind(this));

            conn.on('close', function() {
                console.log('v1 Connection Closed');
            });

            this.connResolver(conn);
        });

        // Establish connection to the platform
        this.socket.connect('ws://'+this.host+":"+this.port, "v1");
    }

    protected handleConnectionError(error: Error) {
        this.logger.debug("Connection error", error);
    }

    protected connection() : P<WebSocketConnection> {
        return this.conn;
    }

    private registerResponseHandler(conn: WebSocketConnection, request: ServiceRequest): P<ServiceResponse> {

        // Establish a message listener that will be removed after the response has been received.
        this.responseHandlers[request.id] = new ResponseHandler(conn, this.protocolHandler);
        return this.responseHandlers[request.id].waitForResponse(request);
    }

    private removeResponseHandler(request: ServiceRequest ) : void {
        delete this.responseHandlers[request.id];
    }

    resolveService(query:CapabilityQuery): P<ServiceProxy> {
        return this.conn.then((connection: WebSocketConnection) : P<ServiceProxy>  => {
            let request : ServiceRequest = new ResolveServiceRequest(query);

            // Send the request to the stream platform gateway
            connection.sendBytes(this.protocolHandler.encode(request));

            // Register our response handler
            return this.registerResponseHandler(connection, request).then((response: ServiceResponse ) : ServiceProxy => {
                console.log("Received response", response);

                // Remove this response handler
                this.removeResponseHandler(request);

                // Create our service proxy
                return new StreamServiceProxy(this, connection, response.data);
            });

        });
    }

    send(request:ServiceRequest): void {
        this.conn.then((connection: WebSocketConnection) => {

            // Send the request to the stream platform gateway
            connection.sendBytes(this.protocolHandler.encode(request));

        });
    }

    exec(request:ServiceRequest): P<ServiceResponse> {
        return this.conn.then((connection: WebSocketConnection) => {

            // Send the request to the stream platform gateway
            connection.sendBytes(this.protocolHandler.encode(request));

            // Register our response handler
            return this.registerResponseHandler(connection, request).then((response: ServiceResponse ) => {

                // Remove this response handler
                this.removeResponseHandler(request);

                return response;
            });
        });
    }

    broadcast(request:ServiceRequest):P<any> {

        // Make sure we don't target a specific service
        request.service = null;

        return this.exec(request);
    }

    head(request:ServiceRequest):P<ServiceExecutionPlan> {
        request.options.simulate = true;
        return this.exec(request);
    }

}
