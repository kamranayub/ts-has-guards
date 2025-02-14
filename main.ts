declare global {
  /**
   * Augments `Map` with the ability to type-guard against known keys.
   */
  interface Map<K, V> {
    has<P extends K>(key: P): this is { get(key: P): V } & this;
  }

  /**
   * Augments `Body` that augments the `formData` method to supports returning a {@see TypedFormData}.
   */
  interface Body {
    formData<K, V extends FormDataEntryValue = FormDataEntryValue>(): Promise<
      TypedFormData<K, V>
    >;
  }
}

/**
 * A version of `FormData` with the ability to type-guard against known keys.
 *
 * @example Creating a new typed `FormData`:
 * ```ts
 * type KnownKeys = "username" | "password";
 * const formData = new TypedFormData<KnownKeys>();
 * ```
 *
 * @example Converting an existing `FormData` from a `Request` instance:
 * ```ts
 * type KnownKeys = "username" | "password";
 *
 * const req = new Request();
 * const searchParams = req.formData<KnownKeys>();
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

/**
 * A version of `URLSearchParams` with the ability to type-guard against known keys.
 *
 * @example Creating a new typed `URLSearchParams`:
 * ```ts
 * type KnownKeys = "term" | "filter";
 * const searchParams = new TypedURLSearchParams<KnownKeys>();
 * ```
 * @example Converting an existing `URLSearchParams` from a `URL` instance:
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

export const TypedFormData: new <
  K = string,
  V extends FormDataEntryValue = FormDataEntryValue,
> // deno-lint-ignore no-explicit-any
() => TypedFormData<K, V> = FormData as any;

export const TypedURLSearchParams: new <K = string>() => TypedURLSearchParams<
  K
> // deno-lint-ignore no-explicit-any
 = URLSearchParams as any;
