export class LookupMap<K extends keyof V, V extends object> {
  private map = new Map<V[K], V>();

  constructor(iterable: Iterable<V>, key: K) {
    if (iterable) {
      for (const item of iterable) {
        this.map.set(item[key], item);
      }
    }
  }

  get(key: V[K]) {
    return this.map.get(key);
  }
}
