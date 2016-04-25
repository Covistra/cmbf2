import {ServiceRequest} from "../service-request";
import {ServiceResponse} from "../service-response";
import * as P from "bluebird";
import {connection as WebSocketConnection} from "websocket";
import {ProtocolHandler} from "./protocol-handler";
import {BaseServiceResponse} from "../base-service-response";

export class ResponseHandler {
    private conn: WebSocketConnection;
    private protocolHandler: ProtocolHandler;

    constructor(conn: WebSocketConnection, protocolHandler: ProtocolHandler) {
        this.conn = conn;
        this.protocolHandler = protocolHandler;
    }

    waitForResponse(request: ServiceRequest) : P<ServiceResponse> {

        let responsePromise: P<ServiceResponse> = new P<ServiceResponse>((resolve) => {

            var h = (msg) => {
                console.log("Receive message", msg.type);

                // Disconnect our listener
                this.conn.removeListener('message', h);

                if(msg.type === 'binary') {
                    console.log("Received binary message of len = ", msg.binaryData.length);
                    var response = this.protocolHandler.decode(msg.binaryData);
                    resolve(new BaseServiceResponse(response));
                }

            };

            this.conn.on('message', h);
        });

        // Install the timeout for this request
        responsePromise.timeout(request.options.timeout || 30000);

        return responsePromise;
    } 
}