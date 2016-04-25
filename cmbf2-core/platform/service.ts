
export interface Service {
    id: string,
    version: string,
    group: string,
    target: string,
    action: string,
    container: string,
    impl: any;
}
