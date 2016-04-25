
import {ServiceRequest, ServiceRequestOptions} from "./service-request";
import {Credentials, ANONYMOUS} from "./credential-descriptor";
import {Guid} from "./guid";
import {CapabilityQuery} from "./capability-query";

export class BaseServiceRequest implements ServiceRequest {
    id: string;
    ts: number;
    group: string;
    action: string;
    target: string;
    service: string;
    credentials: Credentials;
    payload: any;
    options: ServiceRequestOptions;

    constructor(options: ServiceRequestOptions) {
        this.id = Guid.newGuid();
        this.ts = Date.now();
        this.options = {result: true, timeout: 30000, simulate: false };
        this.credentials = ANONYMOUS;
    }

    static wrap(data:any) {
        var req = new BaseServiceRequest(data.options);
        req.id = data.id || req.id;
        req.ts = data.ts || req.ts;
        req.group = data.group;
        req.action = data.action;
        req.target = data.target;
        req.service = data.service;
        req.credentials = data.credentials;
        req.payload = data.payload;
        return req;
    }

    toCapabilityQuery():CapabilityQuery {

        return {
            group: this.group,
            target: this.target,
            action: this.action
        };

    }

}