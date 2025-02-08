/**
 * A class representing a task queue that processes tasks sequentially.
 *
 * @template T - The type of the tasks in the queue.
 * @example
 * const queue = new TaskQueue<number>();
 * queue.defineHandler(async (item) => {
 *   console.log('Processing item:', item);
 *   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async work
 * });
 * queue.append(1);
 * queue.append(2);
 * queue.append(3);
 */
export class TaskQueue<T> {
  #queue: Array<T> = [];
  #callback?: (item: T) => Promise<void>;
  #i = 0;

  /**
   * Returns the current size of the queue.
   *
   * @returns The number of tasks in the queue.
   * @example
   * const size = queue.currentSize();
   * console.log('Queue size:', size);
   */
  currentSize() {
    return this.#queue.length;
  }

  /**
   * Appends a task to the end of the queue and starts processing the queue.
   *
   * @param item - The task to append to the queue.
   * @example
   * queue.append(4);
   */
  append(item: T) {
    this.#queue.push(item);
    this.#process();
  }

  /**
   * Inserts a task at the specified index in the queue and processes it if necessary.
   *
   * @param index - The index at which to insert the task.
   * @param item - The task to insert into the queue.
   * @example
   * await queue.insertAtIndex(1, 5);
   */
  async insertAtIndex(index: number, item: T) {
    this.#queue[index] = item;
    if (this.#i >= index) {
      await this.#callback?.(item);
    }
    await this.#process();
  }

  /**
   * Defines the handler function to process each task in the queue.
   *
   * @param callback - The handler function to process each task.
   * @example
   * queue.defineHandler(async (item) => {
   *   console.log('Processing item:', item);
   *   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async work
   * });
   */
  defineHandler(callback: (item: T) => Promise<void>) {
    this.#callback = callback;
    this.#process();
  }

  /**
   * Processes the tasks in the queue sequentially.
   *
   * @private
   */
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
