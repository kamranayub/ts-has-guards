# typed-collections

TypeScript utility types that augment built-in collection types like Map, Set,
FormData, and URLSearchParams to offer type guarding capability to
getters/setters.

## Map

Allows you to guard against a known set of keys.

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

## FormData

Since `FormData` is a built-in lib type that can be passed from your runtime or framework, this library will augment the method typings to support guarding:

```ts
type KnownKeys = "key" | "key2";

  const formData = new FormData();

  // Non-generic has no type enforcement
  formData.set("key", "value");

  // Set known key
  formData.set<KnownKeys>("key", "value");

  // @ts-expect-error unknown is not a known key
  formData.set<KnownKeys>("unknown", "should error");

  if (formData.has<KnownKeys>("key")) {
    const _value: FormDataEntryValue = formData.get("key");

    // @ts-expect-error key2 has not been guarded
    const _unknownValue: string = formData.get("key2");
  }
```

> [!NOTE]
> Why can't we do `new FormData<KnownKeys>()`? Since `FormData` is not generically typed to begin with, TypeScript does not allow replacing the type like `Map<K, V>` does. Either we need to offer a _new_ type, like `TypedFormData` or we have to overload the `FormData` methods individually. A new type would force you to cast passed variables from the framework/runtime manually like `formData as TypedFormData<KnownKeys>` and that feels worse.