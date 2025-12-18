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

const lazy = LazyConstProxy(() => createHeavyObject());

// The heavy object is created only when a property is accessed:
console.log(lazy.value); // -> logs "creating heavy object", then "42"
lazy.increment();
console.log(lazy.value); // -> "43"
```

API is forwarded from the package entry ([src/index.ts](src/index.ts)) and implemented in [src/LazyConstProxy.ts](src/LazyConstProxy.ts). The handler type is declared in [src/types.ts](src/types.ts).

## Build

This project uses TypeScript. To build:

```sh
npm run build
```

## License

MIT — see [package.json](package.json) for
