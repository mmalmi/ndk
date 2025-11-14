/**
 * Lightweight queue node for linked list implementation.
 */
export class QueueNode<V> {
  public value: V
  public next: QueueNode<V> | null = null

  constructor(value: V) {
    this.value = value
  }
}

/**
 * High-performance FIFO queue using a singly-linked list.
 * Optimized for WebSocket message processing with O(1) enqueue/dequeue.
 */
export class Queue<V> {
  private first: QueueNode<V> | null = null
  private last: QueueNode<V> | null = null
  private _size = 0

  /**
   * Add value to end of queue.
   * @returns true if successfully enqueued
   */
  enqueue(value: V): boolean {
    const newNode = new QueueNode(value)

    if (!this.last) {
      // Empty queue
      this.first = newNode
      this.last = newNode
    } else {
      // Add to end
      this.last.next = newNode
      this.last = newNode
    }

    this._size++
    return true
  }

  /**
   * Remove and return value from front of queue.
   * @returns value or null if queue is empty
   */
  dequeue(): V | null {
    if (!this.first) return null

    const target = this.first
    this.first = target.next

    // If queue is now empty, clear last pointer
    if (!this.first) {
      this.last = null
    }

    this._size--
    return target.value
  }

  /**
   * Peek at front value without removing it.
   */
  peek(): V | null {
    return this.first?.value ?? null
  }

  /**
   * Check if queue is empty.
   */
  get isEmpty(): boolean {
    return this.first === null
  }

  /**
   * Get current queue size.
   */
  get size(): number {
    return this._size
  }

  /**
   * Clear all items from queue.
   */
  clear(): void {
    this.first = null
    this.last = null
    this._size = 0
  }
}

/**
 * Yields control back to the event loop.
 * Allows other async tasks to run between queue processing.
 */
export async function yieldThread(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}
