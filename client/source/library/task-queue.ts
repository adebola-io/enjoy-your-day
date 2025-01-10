export class TaskQueue<T> {
  #queue: Array<T> = [];
  #callback?: (item: T) => Promise<void>;
  #i = 0;

  currentSize() {
    return this.#queue.length;
  }

  append(item: T) {
    this.#queue.push(item);
    this.#process();
  }

  async insertAtIndex(index: number, item: T) {
    this.#queue[index] = item;
    await this.#process();
  }

  defineHandler(callback: (item: T) => Promise<void>) {
    this.#callback = callback;
    this.#process();
  }

  async #process() {
    if (this.#queue.length === 0) return;

    for (; this.#i < this.#queue.length; this.#i++) {
      if (!this.#queue[this.#i]) {
        break;
      }
      const item = this.#queue[this.#i];
      if (!item || !this.#callback) continue;
      await this.#callback(item);
    }
  }
}
