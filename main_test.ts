import "./main.ts";
import { TypedFormData, TypedURLSearchParams } from "./main.ts";

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

    // @ts-expect-error 2322
    const _unknownValue: string = map.get("key2");
  }
});

Deno.test(function formDataTest() {
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
});

Deno.test(async function formDataRequestTest() {
  type KnownKeys = "key" | "key2";

  const req = new Request(new URL("https://test.com"), { 
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: new FormData()
  });
  const _formData = await req.formData<KnownKeys>();
});

Deno.test(function formDataConversionTest() {
  type KnownKeys = "key" | "key2";

  const data = new FormData();
  const _formData = data as unknown as TypedFormData<KnownKeys>;
});

Deno.test(function urlSearchParamsTest() {
  type KnownKeys = "key" | "key2";

  const searchParams = new TypedURLSearchParams<KnownKeys>();

  // Set known key
  searchParams.set("key", "value");

  // @ts-expect-error unknown is not a known key
  searchParams.set("unknown", "should error");

  if (searchParams.has("key")) {
    const _value: string = searchParams.get("key");

    // @ts-expect-error key2 has not been guarded
    const _unknownValue: string = searchParams.get("key2");
  }

  for (const key of searchParams.keys()) {
    // @ts-expect-error Should be no overlap with KnownKeys
    if (key === "unknown") {
      break;
    }
  }
});

Deno.test(function urlSearchParamsConversionTest() {
  type KnownKeys = "key" | "key2";

  const url = new URL("https://test.com?key=foo&key2=bar");
  const _typedSearchParams1 = url.searchParams as TypedURLSearchParams<
    KnownKeys
  >;
});
