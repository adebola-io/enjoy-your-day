/**
 * A class representing a lookup map that allows quick access to objects by a specific key.
 *
 * @template K - The key type of the objects in the map.
 * @template V - The type of the objects in the map.
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 * }
 * const users: User[] = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 * ];
 * const userMap = new LookupMap(users, 'id');
 * const user = userMap.get(1);
 * console.log(user); // Outputs: { id: 1, name: 'Alice' }
 */
export class LookupMap<K extends keyof V, V extends object> {
  private map = new Map<V[K], V>();

  /**
   * Creates an instance of LookupMap.
   *
   * @param iterable - An iterable of objects to initialize the map with.
   * @param key - The key to use for looking up objects in the map.
   */
  constructor(iterable: Iterable<V>, key: K) {
    if (iterable) {
      for (const item of iterable) {
        this.map.set(item[key], item);
      }
    }
  }

  /**
   * Retrieves an object from the map by its key.
   *
   * @param key - The key of the object to retrieve.
   * @returns The object associated with the key, or undefined if the key does not exist in the map.
   * @example
   * const user = userMap.get(2);
   * console.log(user); // Outputs: { id: 2, name: 'Bob' }
   */
  get(key: V[K]) {
    return this.map.get(key);
  }
}
