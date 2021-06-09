/**
 * @typedef {Object} item
 * @property {number|string|Symbol} id Any unique identifier.
 * @property {*} value - Any value.
 */

/**
 * An item in a queue's link-list.
 */
export default class QueueItem {
	next = null;
	value;

	/**
	 * @param {item} init
	 */
	constructor(value) {
		this.value = value;
	}
}
QueueItem.prototype.__proto__ = null; // chromium / v8 bug #5115
