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
```

Variant | ops/sec<br />(more is better) | % variance<br />(less is better) | runs completed<br />(more is better)
:-- | --: | --: | --:
MapIndexedQueue | 1,293 | ±0.29% | 92
MapLinkedQueue | 426 | ±0.10% | 92
HashQueue | 399 | ±0.18% | 90
SetQueue | 61.23 | ±0.13% | 64

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
