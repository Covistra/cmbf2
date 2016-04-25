
import {Credentials} from "./credential-descriptor";
import {CapabilityQuery} from "./capability-query";

export interface ServiceRequestOptions {
    timeout: number;
    result: boolean;
    delay?: number;
    execute_at?: string;
    parallel?: number;
    simulate?: boolean;
}

export interface ServiceRequest {
    id: string;
    group?: string;
    action?: string;
    target?: string;
    service?: string;
    credentials?: Credentials;
    payload?: any;
    options?: ServiceRequestOptions;

    toCapabilityQuery(): CapabilityQuery;
}
