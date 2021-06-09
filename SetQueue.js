export default class SetQueue {
	#items = new Set();

	/**
	 * @param {Array<item>} [items]
	 */
	constructor(items = new Array(0)) {
		this.enque(...items);
	}

	/**
	 * Get the head of the queue
	 * @returns {*} The head item, or nothing when queue is empty.
	 */
	deque() {
		const items = this.#items;

		if (!items.size) return null;

		const [item] = items;

		items.delete(item);

		return item;
	}

	/**
	 * Append item(s) to the queue
	 * @param {...*} items The item(s) to append. At a minimum, item(s) must have `id` and `value`
	 * properties.
	 * @returns {integer} The (updated) number of items in the queue.
	 */
	enque(...items) {
		if (!items.length) return this.#items.size;

		for (const item of items) this.#items.add(item);

		return this.#items.size;
	}
}
SetQueue.prototype.__proto__ = null; // chromium / v8 bug #5115
