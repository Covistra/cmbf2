import * as joi from "joi";
import {Guid} from "./guid";

/**
 * Schema describes a data structure
 */
export class Schema {
    private id: string;
    private version: number;
    protected schema: joi.ObjectSchema;

    constructor(id?, version?) {
        this.id = id || Guid.newGuid();
        this.version = version || 1;
        this.schema = joi.object();
    }

    getId() {
        return this.id;
    }

    getUrn() {
        return "urn:" + this.id + ":" + this.version;
    }

    /**
     * Check if the provided object comply with this schema
     * @param object The object to validate
     * @return Promise resolved on the
     */
    validate(object: any) {
        return joi.validate(object, this.schema);
    }

    /**
     * Configure the Joi object schema for this schema.
     * @param object
     * @returns {joi.ObjectSchema} The joi schema directly to add support for chaining syntax
     */
    keys(object : any) {
        this.schema = this.schema.keys(object);
        return this.schema;
    }

    /**
     * Transform this object into a complying schema instance.
     * @param object
     */
    normalize(object: any) {
        return joi.validate(object, this.schema, { convert: true, allowUnknown: true, stripUnknown: true });
    }

    static Types = joi;
}
