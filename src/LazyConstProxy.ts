import { LazyProxyHandler } from './types';

export function LazyConstProxy<T extends object>(instanceFactory: () => T) {
    return new Proxy({} as LazyProxyHandler<T>, {
        get(target, prop, receiver) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.get(target.instance, prop, receiver);
        },
        set(target, prop, value, receiver) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.set(target.instance, prop, value, receiver);
        },
    }) as T;
}
