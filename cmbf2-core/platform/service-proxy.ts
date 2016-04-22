
import {ServiceRequest} from "./service-request";

export interface ServiceProxy {

    exec(request: ServiceRequest): any;

    send(request: ServiceRequest): any;
}
