// deno-lint-ignore no-explicit-any
export const GuardedMap: GuardedMapConstructor = Map as any;

// deno-lint-ignore no-explicit-any
export const GuardedFormData: GuardedFormDataConstructor = FormData as any;

export const GuardedURLSearchParams: GuardedURLSearchParamsConstructor = // deno-lint-ignore no-explicit-any
  URLSearchParams as any;

/**
 * A version of `Map` with the ability to type-guard against known keys.
 *
 * @example Creating a new guarded `Map`:
 * ```ts
 * import { GuardedMap } from '@kamranayub/ts-has-guards';
 *
 * type KnownKeys = "username" | "password";
 * const map = new GuardedMap<KnownKeys, string>();
 * ```
 *
 * @example Creating a new guarded `Map` with inferred key-values:
 * ```ts
 * import { GuardedMap } from '@kamranayub/ts-has-guards';
 *
 * const map = new GuardedMap([
 *   ['username', ''],
 *   ['password', '']
 * ] as const);
 * ```
 *
 * @example Converting a `Map` to a guarded `GuardedMap`:
 * Unfortunately, the two types are not directly assignable so you have to cast as `unknown` first.
 * ```ts
 * import { GuardedMap } from '@kamranayub/ts-has-guards';
 *
 * type KnownKeys = 'key1' | 'key2';
 * const map = otherMap as unknown as GuardedMap<KnownKeys, string>;
 * ```
 */
export interface GuardedMap<K, V> extends Map<K, V> {
  has<P extends K>(key: P): this is { get(key: P): V } & this;
}

interface GuardedMapConstructor {
  new <K, V>(): GuardedMap<K, V>;
  new <K, V>(entries: Array<[K, V]>): GuardedMap<K, V>;
}

/**
 * A version of `FormData` with the ability to type-guard against known keys.
 *
 * @example Creating a new guarded `FormData`:
 * ```ts
 * import { GuardedFormData } from '@kamranayub/ts-has-guards';
 *
 * type KnownKeys = "username" | "password";
 * const formData = new GuardedFormData<KnownKeys>();
 * ```
 *
 * @example Converting an existing `FormData` from a `Request` instance:
 * Unfortunately, the two types are not directly assignable so you have to cast as `unknown` first.
 * ```ts
 * type KnownKeys = "username" | "password";
 *
 * const req = new Request();
 * const rawFormData = await req.formData();
 * const formData = rawFormData as unknown as GuardedFormData<KnownKeys>;
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
export interface GuardedFormData<
  K = string,
  V extends FormDataEntryValue = FormDataEntryValue,
> {
  has<P extends K>(name: P): this is { get(name: P): V } & this;

  //
  // the rest is all the same
  //
  append(name: K, value: V | Blob, fileName?: string): void;
  delete(name: K): void;
  get(name: K): V | null;
  getAll(name: K): V[];
  set(name: K, value: string | Blob, fileName?: string): void;
}

interface GuardedFormDataConstructor {
  new <
    K = string,
    V extends FormDataEntryValue = FormDataEntryValue,
  >(): GuardedFormData<K, V>;
}

/**
 * A version of `URLSearchParams` with the ability to type-guard against known keys.
 *
 * @example Creating a new typed `URLSearchParams`:
 * ```ts
 * type KnownKeys = "term" | "filter";
 * const searchParams = new GuardedURLSearchParams<KnownKeys>();
 * ```
 * @example Converting an existing `URLSearchParams` from a `URL` instance:
 *
 * ```ts
 * type KnownKeys = "term" | "filter";
 *
 * const url = new URL("https://test.com?term=search&filer=by_date");
 * const searchParams = url.searchParams as GuardedURLSearchParams<KnownKeys>;
 * ```
 */
export interface GuardedURLSearchParams<K = string> {
  has<P extends K>(
    name: P,
    value?: string,
  ): this is { get(name: P): string } & this;

  //
  // the rest is all the same
  //
  append(name: K, value: string): void;
  delete(name: K, value?: string): void;
  get(name: K): string | null;
  getAll(name: K): string[];
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

interface GuardedURLSearchParamsConstructor {
  new <K = string>(): GuardedURLSearchParams<K>;
  new <K extends string | number | symbol = string>(
    init?: Iterable<string[]> | Record<K, string> | string,
  ): GuardedURLSearchParams<K>;
}
