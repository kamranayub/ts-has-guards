declare global {
  /**
   * Type-guarded Map when keys are strict
   * @see https://stackoverflow.com/a/73467859/109458
   */
  interface Map<K, V> {
    has<P extends K>(key: P): this is { get(key: P): V } & this;
  }

  interface TypedFormData<
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

  interface TypedURLSearchParams<K = string> {
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
