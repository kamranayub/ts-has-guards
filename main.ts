declare global {
  /**
   * Type-guarded Map when keys are strict
   * @see https://stackoverflow.com/a/73467859/109458
   */
  interface Map<K, V> {
    has<P extends K>(key: P): this is { get(key: P): V } & this;
  }

  /**
   * Augmented FormData with generic overloads that support explicit type guarding
   */
  interface FormData {
    get<K extends string>(name: K): FormDataEntryValue | null;
    getAll<K extends string>(name: K): FormDataEntryValue[];
    has<K extends string>(name: K): this is { get(name: K): FormDataEntryValue } & this;
    set<K extends string>(name: K, value: string | Blob, fileName?: string): void;
  }
}