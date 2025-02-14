# ts-has-guards

TypeScript utility types that augment built-in collection types like Map,
FormData, and URLSearchParams that use `.has(key)` methods to offer a type 
guarding capability that works with `.get(key)`.

## The Problem

This will throw an error in vanilla TS:

```ts
const map = new Map([['key', 1]] as const);

if (map.has('key')) {
    const value: number = map.get('key');
//  !!!   ^---- ERROR!
}
```

But with this library, it works like you might expect. `map.get('key')` will be narrowed to `number` instead of `number | undefined`. Without any additional typings.

Additionally, this library provides type-guarded equivalents for `TypedFormData` and `TypedURLSearchParams`.

## Getting Started

Choose your poison:

```
deno add jsr:@kamranayub/ts-has-guards

npx jsr add @kamranayub/ts-has-guards
yarn dlx jsr add @kamranayub/ts-has-guards
pnpm dlx jsr add @kamranayub/ts-has-guards
bunx jsr add @kamranayub/ts-has-guards
```

This library was built with [Deno](https://deno.com).

## Usage

In a `globals.ts` file, you can import the package:

```ts
import '@kamranayub/ts-has-guards';
```

This should activate the augmented global typings for `Map.has` and `Body.formData`.

To use the typed versions of `URLSearchParams` and `FormData`, you need to explicitly use and import them:

```ts
import { TypedURLSearchParams, TypedFormData } from '@kamranayub/ts-has-guards';

// Use like regular API but you can pass an explicit set of known keys
type KnownKeys = 'key1' | 'key2';

const searchParams = new TypedURLSearchParams<KnownKeys>();
const formData = new TypedFormData<KnownKeys>();
```

You can reference the tests or docs for some more examples.

## Docs

View the [docs on JSR](https://jsr.io/@kamranayub/ts-has-guards/doc).

## Shameless Plug

Maybe have a listen to [typescript.fm](https://typescript.fm). :mic:

## Credits

Built on the [shoulders of giants](https://stackoverflow.com/a/73467859/109458). 

Inspired by [@dbushell](https://bsky.app/profile/dbushell.com/post/3li5bohbiok27).