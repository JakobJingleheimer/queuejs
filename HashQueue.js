import QueueItem from './QueueItem.js';

class Hashmap {
	get size() {
		return Object.keys(this).length;
	}

	constructor(init = {}) {
		Object.assign(this, init);
	}
}
Hashmap.prototype.__proto__ = null; // chromium / v8 bug #5115

/**
 * A simple lookup-efficient & space-efficient first-in, first-out (FIFO) list. Item storage
 * leverages a hashmap (non-contiguous memory storage) of interlinked items: Each item points to
 * the next in the queue via a `next` property.
 */
export default class HashQueue {
	#head = null;
	#items = new Hashmap();

	/**
	 * @param {Array<item>} [items]
	 */
	constructor(items = new Array(0)) {
		this.enque(...items);
	}

	/**
	 * Get the head of the queue
	 * @returns {QueueItem?} The head item, or nothing when queue is empty.
	 */
	deque() {
		const item = this.#head;

		if (!item) return null;

		const newhead = item.next;

		delete this.#items[item.id];

		this.#head = newhead;

		return item.value;
	}

	/**
	 * Append item(s) to the queue
	 * @param {...*} items The item(s) to append. At a minimum, item(s) must have `id` and `value`
	 * properties.
	 * @returns {integer} The (updated) number of items in the queue.
	 */
	enque(...items) {
		const count = items.length;

		if (!count) return this.#items.size;

		const { size } = this.#items; // size = 10 (next available index)
		const newLastIndex = size + count - 1;
		let item;

		// count down so "previous" item has already been processed
		for (
			let i = newLastIndex;
			i >= size;
			i--
		) {
			item = this.#items[i] = new QueueItem(items[i]);
			item.next = this.#items[i+1] || null;
		}

		this.#head ??= item;

		return this.#items.size;
	}
}
HashQueue.prototype.__proto__ = null; // chromium / v8 bug #5115
