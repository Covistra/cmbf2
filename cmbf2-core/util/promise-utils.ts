
export module PromiseUtils {
    export interface Resolver<T> {
        (result: T) : void;
    }

    export interface Rejecter<T extends Error> {
        (error: T) : void;
    }

}