// deno-lint-ignore no-explicit-any
export const TypedMap: TypedMapConstructor = Map as any;

// deno-lint-ignore no-explicit-any
export const TypedFormData: TypedFormDataConstructor = FormData as any;

export const TypedURLSearchParams: TypedURLSearchParamsConstructor = // deno-lint-ignore no-explicit-any
  URLSearchParams as any;

/**
 * A version of `Map` with the ability to type-guard against known keys.
 * 
 * @example Creating a new guarded `Map`:
 * ```ts
 * import { TypedMap } from '@kamranayub/ts-has-guards';
 * 
 * type KnownKeys = "username" | "password";
 * const map = new TypedMap<KnownKeys, string>();
 * ```
 * 
 * @example Creating a new guarded `Map` with inferred key-values:
 * ```ts
 * import { TypedMap } from '@kamranayub/ts-has-guards';
 * 
 * const map = new TypedMap([
 *   ['username', ''], 
 *   ['password', '']
 * ] as const);
 * ```
 * 
 * @example Converting a `Map` to a guarded `TypedMap`:
 * Unfortunately, the two types are not directly assignable so you have to cast as `unknown` first.
 * ```ts
 * import { TypedMap } from '@kamranayub/ts-has-guards';
 * 
 * type KnownKeys = 'key1' | 'key2';
 * const map = otherMap as unknown as TypedMap<KnownKeys, string>;
 * ```
 */
export interface TypedMap<K, V> extends Map<K, V> {
  has<P extends K>(key: P): this is { get(key: P): V } & this;
}

interface TypedMapConstructor {
  new <K, V>(): TypedMap<K, V>;
  new <K, V>(entries: Array<[K, V]>): TypedMap<K, V>;
}

/**
 * A version of `FormData` with the ability to type-guard against known keys.
 *
 * @example Creating a new guarded `FormData`:
 * ```ts
 * import { TypedFormData } from '@kamranayub/ts-has-guards';
 * 
 * type KnownKeys = "username" | "password";
 * const formData = new TypedFormData<KnownKeys>();
 * ```
 *
 * @example Converting an existing `FormData` from a `Request` instance:
 * Unfortunately, the two types are not directly assignable so you have to cast as `unknown` first.
 * ```ts
 * type KnownKeys = "username" | "password";
 *
 * const req = new Request();
 * const rawFormData = await req.formData();
 * const formData = rawFormData as unknown as TypedFormData<KnownKeys>;
 * ```
 *
 * @example Converting an existing `FormData` instance:
 * Unfortunately, the two types are not directly assignable so you have to cast as `unknown` first.
 * ```ts
 * type KnownKeys = "username" | "password";
 *
 * const data = new FormData();
 * const searchParams = data as unknown as FormData<KnownKeys>;
 * ```
 */
export interface TypedFormData<
  K = string,
  V extends FormDataEntryValue = FormDataEntryValue,
> {
  append(name: K, value: V | Blob, fileName?: string): void;
  delete(name: K): void;
  get(name: K): V | null;
  getAll(name: K): V[];
  has<P extends K>(name: P): this is { get(name: P): V } & this;
  set(name: K, value: string | Blob, fileName?: string): void;
}

interface TypedFormDataConstructor {
  new <
    K = string,
    V extends FormDataEntryValue = FormDataEntryValue,
  >(): TypedFormData<K, V>;
}

/**
 * A version of `URLSearchParams` with the ability to type-guard against known keys.
 *
 * @example Creating a new typed `URLSearchParams`:
 * ```ts
 * type KnownKeys = "term" | "filter";
 * const searchParams = new TypedURLSearchParams<KnownKeys>();
 * ```
 * @example Converting an existing `URLSearchParams` from a `URL` instance:
 * 
 * ```ts
 * type KnownKeys = "term" | "filter";
 *
 * const url = new URL("https://test.com?term=search&filer=by_date");
 * const searchParams = url.searchParams as TypedURLSearchParams<KnownKeys>;
 * ```
 */
export interface TypedURLSearchParams<K = string> {
  append(name: K, value: string): void;
  delete(name: K, value?: string): void;
  get(name: K): string | null;
  getAll(name: K): string[];
  has<P extends K>(
    name: P,
    value?: string,
  ): this is { get(name: P): string } & this;
  set(name: K, value: string): void;
  sort(): void;
  forEach(
    callbackfn: (value: string, key: K, parent: this) => void,
    // deno-lint-ignore no-explicit-any
    thisArg?: any,
  ): void;
  keys(): IterableIterator<K>;
  values(): IterableIterator<string>;
  entries(): IterableIterator<[K, string]>;
  [Symbol.iterator](): IterableIterator<[K, string]>;
  toString(): string;
  size: number;
}

interface TypedURLSearchParamsConstructor {
  new <K = string>(): TypedURLSearchParams<K>;
  new <K extends string | number | symbol = string>(
    init?: Iterable<string[]> | Record<K, string> | string,
  ): TypedURLSearchParams<K>;
}
