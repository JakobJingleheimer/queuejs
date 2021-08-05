export default class Hashmap {
	get size() {
		return Object.keys(this).length;
	}

	constructor(init = {}) {
		Object.assign(this, init);
	}
}
Hashmap.prototype.__proto__ = null; // chromium / v8 bug #5115
