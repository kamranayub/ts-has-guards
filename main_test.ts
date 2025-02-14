import "./main.ts";

Deno.test(function mapTest() {
  // Need to pass a known set of keys to allow narrowing the type
  // otherwise it could be any string created by any means at runtime
  type KnownKeys = "key" | "key2";

  const map = new Map<KnownKeys, string>();

  map.set("key", "value");

  // @ts-expect-error unknown is not a known key
  map.set("unknown", "should error");

  if (map.has("key")) {
    const _value: string = map.get("key");

    // @ts-expect-error key2 has not been guarded
    const _unknownValue: string = map.get("key2");
  }
});

Deno.test(function formDataTest() {
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
});
