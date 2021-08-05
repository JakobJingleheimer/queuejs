# QueueJS

A simple queue implementation.

Included are 5 implementations offering the same API:

* `HashIndexedQueue`
* `HashLinkedQueue`
* `MapIndexedQueue`
* `MapLinkedQueue`
* `SetQueue`

All 4 implementations leverage non-sequential memory.


## Performance

`MapIndexedQueue` is **significantly** the most performant, and `SetQueue` and especially `HashIndexedQueue` are _by far_ the least performant:

```console
$> npm run benchmark
```

Variant | ops/sec<br />(more is better) | <abbr title="Relative Margin of Error (% of mean)">RME</abbr><br />(less is better) | runs completed<br />(more is better)
:-- | --: | --: | --:
MapIndexedQueue | 1,329 | ±0.27% | 93
MapLinkedQueue | 426 | ±0.21% | 92
HashLinkedQueue | 434 | ±0.21% | 89
SetQueue | 61.01 | ±0.07% | 63
HashIndexedQueue | 2.65 | ±0.38% | 11

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
