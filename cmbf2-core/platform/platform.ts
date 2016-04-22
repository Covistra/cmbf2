
import {CapabilityQuery} from "./capability-query";
import {ServiceRequest} from "./service-request";
import {ServiceProxy} from "./service-proxy";
import * as P from "bluebird";

export interface Platform {
    
    resolveService(query: CapabilityQuery ): P<ServiceProxy>;

    /**
     * Fire and forget strategy implied
     */
    send(request: ServiceRequest): P<any>;

    /**x
     * Promise will be resolved with the result
     */
    exec(request: ServiceRequest): P<any>;

    /**
     * Multiple services implied
     */
    broadcast(request: ServiceRequest) : P<any>;

    /**
     * Simulate an execution and retrieve the complete execution plan
     */
    head(request: ServiceRequest): P<any>;
}
