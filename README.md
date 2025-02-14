# typed-collections

TypeScript utility types that augment built-in collection types like Map, Set,
FormData, and URLSearchParams to offer type guarding capability to
getters/setters.

## Typed Map

Since `Map` is a generic type, this library augments the global declaration
allowing you to guard against a known set of keys:

```ts
// Need to pass a known set of keys to allow narrowing the type
// otherwise it could be any string created by any means at runtime
type KnownKeys = "key" | "key2";

const map = new Map<KnownKeys, string>();

map.set("key", "value");

// @ts-expect-error
map.set("unknown", "should error");

if (map.has("key")) {
  const value: string = map.get("key");

  // @ts-expect-error
  const unknownValue: string = map.get("key2");
}
```

## TypedFormData

Since `FormData` is a built-in lib type without generic support, it cannot be
overridden so this library exports a `TypedFormData` that delegates to the
runtime `FormData` implementation but augments it with type guarding
capabilities:

```ts
type KnownKeys = "key" | "key2";

const formData = new TypedFormData<KnownKeys>();

// Set known key
formData.set("key", "value");

// @ts-expect-error unknown is not a known key
formData.set("unknown", "should error");

if (formData.has("key")) {
  const _value: FormDataEntryValue = formData.get("key");

  // @ts-expect-error 2345: key2 has not been guarded
  const _unknownValue: FormDataEntryValue = formData.get("key2");
}
```

## TypedURLSearchParams

Since `URLSearchParams` is a built-in lib type without generic support, it
cannot be overridden so this library exports a `TypedURLSearchParams` that
delegates to the runtime `URLSearchParams` implementation but augments it with
type guarding capabilities:

```ts
type KnownKeys = "key" | "key2";

const formData = new TypedFormData<KnownKeys>();

// Set known key
formData.set("key", "value");

// @ts-expect-error unknown is not a known key
formData.set("unknown", "should error");

if (formData.has("key")) {
  const _value: FormDataEntryValue = formData.get("key");

  // @ts-expect-error 2345: key2 has not been guarded
  const _unknownValue: FormDataEntryValue = formData.get("key2");
}
```
