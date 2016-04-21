/**
 * Logger interface used throughout the system to trace activity in all micro-services
 */

export interface Logger {

    trace() : void;
    debug() : void;
    info(): void;
    warn(): void;
    error(): void;
    fatal(): void;

    child(opts: any) : void;
}
