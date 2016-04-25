
import {ServiceRequest} from "./service-request";
import * as P from "bluebird";
import {ServiceResponse} from "./service-response";

export interface ServiceProxy {

    exec(request: ServiceRequest): P<ServiceResponse>;

    send(request: ServiceRequest): void;
}
