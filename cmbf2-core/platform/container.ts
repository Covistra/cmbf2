
import {Resource} from "./resource";
import {ServiceRequest} from "./service-request";
import {ServiceProxy} from "./service-proxy";

export interface Container {
    getId(): string;
    getResource(urn: string): Resource;
    matchServices(request: ServiceRequest) : Promise<Array<ServiceProxy>>
}
