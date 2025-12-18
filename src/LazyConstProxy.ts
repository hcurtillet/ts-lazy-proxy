import { LazyProxyHandler } from './types';

export function LazyConstProxy<T extends object>(instanceFactory: () => T) {
    return new Proxy({} as LazyProxyHandler<T>, {
        get(target, prop) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.get(target.instance, prop);
        },
        set(target, prop, value) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.set(target.instance, prop, value);
        },
        deleteProperty(target, p) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.deleteProperty(target.instance, p);
        },
        defineProperty(target, property, attributes) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.defineProperty(
                target.instance,
                property,
                attributes,
            );
        },
        has(target, p) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.has(target.instance, p);
        },
        ownKeys(target) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.ownKeys(target.instance);
        },
        getOwnPropertyDescriptor(target, p) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.getOwnPropertyDescriptor(target.instance, p);
        },
        getPrototypeOf(target) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.getPrototypeOf(target.instance);
        },
        isExtensible(target) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.isExtensible(target.instance);
        },
        preventExtensions(target) {
            if (target.instance === undefined) {
                target.instance = instanceFactory();
            }
            return Reflect.preventExtensions(target.instance);
        },
    }) as T;
}
