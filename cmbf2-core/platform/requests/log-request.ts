import {CapabilityQuery} from "../capability-query";
import * as System from "../system";
import {BaseServiceRequest} from "../base-service-request";
import {ServiceRequestOptions} from "../service-request";

export class LogRequest extends BaseServiceRequest {

    constructor(chunk: Buffer, encoding: string, options?: ServiceRequestOptions) {
        super(options);

        this.action = "log";
        this.payload = {
            chunk: chunk,
            encoding: encoding
        };
    }

}
