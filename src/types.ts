export type LazyProxyHandler<T> = {
    instance?: T;
} & T;
