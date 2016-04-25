import {Container} from "./container";

export interface ResourceSpec {
    urn: string;
    type: string;
    config: any;
}

export interface Resource {
    urn: string;
    config: any;

    initialize(container: Container);

    /**
     * Used to get access to the managed resource. If this is a database, the driver connection
     * will the returned directly. We don't wrap all resources, just make sure to avoid propagating
     * resource API too much.
     */
    getResource(): any;
}
