import type { Cell } from '@adbl/cells';

type CleanupFn = () => void;
type MountFn<T extends Node> = ((node: T) => CleanupFn) | ((node: T) => void);

class DocumentObserver {
  mountedNodes = new Map<Node, Array<CleanupFn>>();
  callbackSets = new Map<Cell<Node | null>, MountFn<Node>[]>();

  constructor() {
    this.init();
  }

  private mount<T extends Node>(node: T, callback: MountFn<T>) {
    const cleanup = callback(node);
    if (cleanup) {
      const cleanups = this.mountedNodes.get(node);
      if (cleanups) {
        cleanups.push(cleanup);
      } else {
        this.mountedNodes.set(node, [cleanup]);
      }
    }
  }

  /**
   * Registers a callback to be called when the node referenced by the provided `ref` is connected to the DOM.
   * If the node is already connected, the callback is called immediately.
   * The callback can return a cleanup function that will be called when the node is disconnected from the DOM.
   *
   * @param ref - A `Cell` containing the node to observe.
   * @param callback - A function that will be called when the node is connected, and can return a cleanup function.
   */
  onConnected<T extends Node>(ref: Cell<T | null>, callback: MountFn<T>) {
    if (ref.value?.isConnected) {
      this.mount(ref.value, callback);
      return;
    }
    const connectedCallbacks = this.callbackSets.get(ref) || [];
    connectedCallbacks.push(callback as MountFn<Node>);
    this.callbackSets.set(ref, connectedCallbacks);
  }

  init() {
    const observer = new MutationObserver(() => {
      for (const [key, callbacks] of this.callbackSets.entries()) {
        if (!key.value?.isConnected) continue;
        for (const callback of callbacks) this.mount(key.value, callback);
        this.callbackSets.delete(key);
      }

      for (const [node, cleanups] of this.mountedNodes.entries()) {
        if (node.isConnected) continue;
        for (const cleanup of cleanups) cleanup();
        this.mountedNodes.delete(node);
      }
    });
    observer.observe(document.body, { subtree: true, childList: true });
  }
}

const observer = new DocumentObserver();

/**
 * Returns the singleton instance of the `DocumentObserver` class,
 * which is responsible for observing the DOM and managing the lifecycle of mounted nodes.
 *
 * @example
 * // Mount a callback when a node is connected to the DOM
 * const nodeRef = cell<HTMLDivElement | null>(null);
 * useObserver().onConnected(nodeRef, (node) => {
 *   console.log('Node connected:', node);
 *   return () => console.log('Node disconnected:', node);
 * });
 *
 * const node = <div ref={nodeRef}>Hello, world!</div>;
 *
 * @returns The singleton instance of the `DocumentObserver` class.
 */
export function useObserver() {
  return observer;
}
