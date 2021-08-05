export default class MapIndexedQueue {
	#head;
	#items = new Map();

	/**
	 * @param {Array<item>} [items]
	 */
	constructor(items = new Array(0)) {
		this.enque(...items);
	}

	/**
	 * Get the head of the queue
	 * @returns {*?} The head item, or nothing when queue is empty.
	 */
	deque() {
		const items = this.#items;

		if (!items.size) return null;

		const i = this.#head;

		const item = this.#items.get(this.#head);

		items.delete(i);

		++this.#head;

		return item;
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
		let i;

		// count down so "previous" item has already been processed
		for (
			i = newLastIndex;
			i >= size;
			i--
		) {
			this.#items.set(i, items[i]);
		}

		this.#head ??= ++i; // for loop decrements 1 extra time

		return this.#items.size;
	}
}
MapIndexedQueue.prototype.__proto__ = null; // chromium / v8 bug #5115
