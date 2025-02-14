# ts-has-guards

This package provides type-guarded versions of the `has` method for built-in
types like `Map`, `FormData`, and `URLSearchParams` so that you can narrow
`.get(key)` return type within the conditional type guard blocks.

> [!WARNING]
> This package is pretty experimental, but I welcome improvements to the DX.

## Why use this package?

If you've ever tried to call `get(key)` after calling `has(key)` and lamented
the fact it still returns `| undefined` or `| null`, you know this problem well.

For example, this will throw an error in vanilla TS:

```ts
const map = new Map([["key", 1]] as const);

if (map.has("key")) {
  const value: number = map.get("key");
  //  !!!   ^---- ERROR!
}
```

But with this library, the type guard works like you might expect.
`map.get('key')` will be narrowed to `number` instead of `number | undefined`.

This library provides type-guarded `has` methods for:

- `Map.has` using `GuardedMap`
- `FormData.has` using `GuardedFormData`
- `URLSearchParams.has` using `GuardedURLSearchParams`

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

To use the typed versions of `Map`, `URLSearchParams` and `FormData`, you need
to explicitly use and import them (each of them are prefixed with `Typed`):

```ts
import {
  GuardedFormData,
  GuardedMap,
  GuardedURLSearchParams,
} from "@kamranayub/ts-has-guards";

// Use like regular API but you can pass an explicit set of known keys
type KnownKeys = "key1" | "key2";

const map = new GuardedMap<KnownKeys, number>();
const searchParams = new GuardedURLSearchParams<KnownKeys>();
const formData = new GuardedFormData<KnownKeys>();
```

When converting built-in lib types to the guarded versions, you must cast as
`unknown` first:

```ts
map as unknown as GuardedMap<MyKeys, string>;
formData as unknown as GuardedFormData<MyKeys>;
searchParams as unknown as TypedSearchParams<MyKeys>;
```

You can reference the tests or docs for some more examples.

## Docs

View the [docs on JSR](https://jsr.io/@kamranayub/ts-has-guards/doc).

## Shameless Plug

Maybe have a listen to [typescript.fm](https://typescript.fm). :mic:

## FAQ

<details>
    <summary>Why can't I augment the global types?</summary>

You could with `Map`, however this is not supported for a published JSR package
[due to slow typings](https://jsr.io/docs/about-slow-types#global-augmentation).
If you'd like to use a local version in your app, you can copy from
[the StackOverflow answer](https://stackoverflow.com/a/73467859/109458) and put
it under a `globals.d.ts` file or `declare global { }` if using modules.

This will not work with the `FormData` and `URLSearchParams` though because
those types are not generic and TS will yell at you if you try to redeclare them
with generic typings.

</details>

## Credits

Built on the [shoulders of giants](https://stackoverflow.com/a/73467859/109458).

Inspired by
[@dbushell](https://bsky.app/profile/dbushell.com/post/3li5bohbiok27).
