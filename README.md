# ts-lazy-proxy

A tiny TypeScript utility that provides a lazy-initialized, read/write proxy for constant-like objects.

- Package: [package.json](package.json)
- Source: [src/index.ts](src/index.ts)
- Main API:
    - [`LazyConstProxy`](src/LazyConstProxy.ts)
    - [`LazyProxyHandler`](src/types.ts)

## Install

```sh
npm install ts-lazy-proxy
```

## Quick example

```ts
import { LazyConstProxy } from 'ts-lazy-proxy';

function createHeavyObject() {
    console.log('creating heavy object');
    return {
        value: 42,
        increment() {
            this.value += 1;
        },
    };
}

const lazy = LazyConstProxy(createHeavyObject);

// The heavy object is created only when a property is accessed:
console.log(lazy.value); // -> logs "creating heavy object", then "42"
lazy.increment();
console.log(lazy.value); // -> "43"
```

Exemple with a class:

```ts
import { LazyConstProxy } from 'ts-lazy-proxy';

class HeavyClass {
    value: number;

    constructor() {
        console.log('HeavyClass instantiated');
        this.value = 100;
    }

    double() {
        this.value *= 2;
    }
}

const lazyInstance = LazyConstProxy(() => new HeavyClass());
console.log(lazyInstance.value); // -> logs "HeavyClass instantiated", then "100"
lazyInstance.double();
console.log(lazyInstance.value); // -> "200"
```

API is forwarded from the package entry ([src/index.ts](src/index.ts)) and implemented in [src/LazyConstProxy.ts](src/LazyConstProxy.ts). The handler type is declared in [src/types.ts](src/types.ts).

## License

MIT — see [package.json](package.json) for
