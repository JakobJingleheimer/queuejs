import Benchmark from 'benchmark';

// bestiejs/benchmark.js#issues/51
global.HashIndexedQueue = await import('./HashIndexedQueue.js').then((module) => module.default);
global.HashLinkedQueue = await import('./HashLinkedQueue.js').then((module) => module.default);
global.MapLinkedQueue = await import('./MapLinkedQueue.js').then((module) => module.default);
global.MapIndexedQueue = await import('./MapIndexedQueue.js').then((module) => module.default);
global.SetQueue = await import('./SetQueue.js').then((module) => module.default);


const suite = new Benchmark.Suite();

function setup() {
	const itemCount = 10_000;
	const items = new Array(itemCount);

	for (let { 0: idx } of items.entries()) items[idx] = { value: '' };
}

suite
	.add({
		name: 'HashIndexedQueue',
		setup,
		fn() {
			const q = new HashIndexedQueue(items);

			while (q.deque()) ;
		}
	})
	.add({
		name: 'HashLinkedQueue',
		setup,
		fn() {
			const q = new HashLinkedQueue(items);

			while (q.deque()) ;
		}
	})
	.add({
		name: 'MapIndexedQueue',
		setup,
		fn() {
			const q = new MapIndexedQueue(items);

			while (q.deque());
		}
	})
	.add({
		name: 'MapLinkedQueue',
		setup,
		fn() {
			const q = new MapLinkedQueue(items);

			while (q.deque());
		}
	})
	.add({
		name: 'SetQueue',
		setup,
		fn() {
			const q = new SetQueue(items);

			while (q.deque());
		}
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.on('cycle', function (event) {
		console.log(String(event.target));
	})
	.on('error', console.error)
	.run({ 'async': true });
