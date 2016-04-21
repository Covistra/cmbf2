/**
 * Logger interface used throughout the system to trace activity in all micro-services
 */

export interface Logger {

    trace(...args: any[]) : void;
    debug(...args: any[]) : void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    fatal(...args: any[]): void;

    child(opts?: any) : Logger;
}
