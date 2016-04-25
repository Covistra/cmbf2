
import {CapabilityQuery} from "../capability-query";
import * as System from "../system";
import {BaseServiceRequest} from "../base-service-request";
import {ServiceRequestOptions} from "../service-request";

export class ResolveServiceRequest extends BaseServiceRequest {
    
    constructor(query: CapabilityQuery, options?: ServiceRequestOptions) {
        super(options);

        this.group = System.Groups.System;
        this.target = System.Schemas.Service;
        this.action = System.Actions.Discover;
        this.payload = query;
    }

}
