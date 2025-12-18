import { describe, it, expect, vi } from 'vitest';
import { LazyConstProxy } from '../src';

describe('LazyConstProxy', () => {
    it('initializes the target lazily (factory called on first access)', () => {
        const factory = vi.fn(() => ({ value: 10 }));
        const proxy = LazyConstProxy(factory);

        expect(factory).not.toHaveBeenCalled();
        // first access triggers creation
        expect((proxy as any).value).toBe(10);
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('does not call factory again on subsequent accesses', () => {
        const factory = vi.fn(() => ({ value: 1 }));
        const proxy = LazyConstProxy(factory);

        expect((proxy as any).value).toBe(1);
        expect((proxy as any).value).toBe(1);
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('forwards method calls with correct this and allows mutation', () => {
        const factory = vi.fn(() => ({
            value: 5,
            inc() {
                // ensure `this` is bound to the underlying object
                (this as any).value += 1;
            },
        }));
        const proxy: any = LazyConstProxy(factory);

        proxy.inc();
        expect(proxy.value).toBe(6);
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('allows writing new properties and reads them back', () => {
        const factory = vi.fn(() => ({ a: 1 }));
        const proxy: any = LazyConstProxy(factory);

        proxy.b = 'hello';
        expect(proxy.b).toBe('hello');
        // underlying object was created on first write
        expect(factory).toHaveBeenCalledTimes(1);
    });

    it('deleting a property affects the underlying object', () => {
        const factory = vi.fn(() => ({ x: 42 }));
        const proxy: any = LazyConstProxy(factory);

        expect(proxy.x).toBe(42);
        expect(delete proxy.x).toBe(true);
        expect('x' in proxy).toBe(false);
    });

    it('propagates factory errors', () => {
        const err = new Error('boom');
        const factory = vi.fn(() => {
            throw err;
        });
        const proxy = LazyConstProxy(factory);

        expect(() => (proxy as any).anything).toThrow(err);
        // subsequent attempts still try to initialize (behavior may vary by implementation)
        expect(factory).toHaveBeenCalled();
    });

    it('handles ownKeys and property descriptors correctly', () => {
        const factory = vi.fn(() => ({ foo: 123, bar: 456 }));
        const proxy = LazyConstProxy(factory);

        const keys = Object.keys(proxy);
        expect(keys).toEqual(['foo', 'bar']);

        const desc = Object.getOwnPropertyDescriptor(proxy, 'foo');
        expect(desc).toBeDefined();
        expect(desc!.value).toBe(123);
    });

    it('correctly reports prototype and extensibility', () => {
        const proto = {
            greet() {
                return 'hi';
            },
        };
        const factory = vi.fn(() => Object.create(proto));
        const proxy = LazyConstProxy(factory);

        expect(Object.getPrototypeOf(proxy)).toBe(proto);
        expect(Object.isExtensible(proxy)).toBe(true);
    });
});
