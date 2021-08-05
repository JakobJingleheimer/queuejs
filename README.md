# QueueJS

A simple queue implementation.

Included are 4 implementations offering the same API:

* `HashQueue`
* `MapIndexedQueue`
* `MapLinkedQueue`
* `SetQueue`

All 4 implementations leverage non-sequential memory.

## Performance

`MapIndexedQueue` is **significantly** the most performant, and SetQueue is _by far_ the least performant:

```console
$> npm run benchmark

HashQueue x 399 ops/sec ±0.18% (90 runs sampled)

MapIndexedQueue x 1,293 ops/sec ±0.29% (92 runs sampled)

MapLinkedQueue x 426 ops/sec ±0.10% (92 runs sampled)

SetQueue x 61.23 ops/sec ±0.13% (64 runs sampled)

Fastest is MapIndexedQueue
```

## Useage

```js
const q = new Queue([
	{
		id: 'abc123',
		value: 'foo',
	},
	{
		id: Symbol('bar'),
		value: 'bar',
	},
	{
		id: 1,
		value: function doSomething() {/* … */},
	},
]);

let next;
while (next = q.deque()) console.log(next);
// 'foo'
// 'bar'
// function doSomething() {/* … */}
// `while` stopped after the 3rd iteration because deque returned falsy

q.enque({ id: 'zed', value: });

q.enque([
	{ id: Date.now(), value: 42 },
]);
```
