

import {ServiceResponse} from "./service-response";

export class BaseServiceResponse implements ServiceResponse {
    data: any;
    meta: any;

    constructor(response: any) {

        if(response && response.data) {
            this.data = response.data;
            this.meta = response.meta;
        }
        else {
            this.data = response;
        }

    }
}
