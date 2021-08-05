import { expect } from 'chai';

import HashIndexedQueue from './HashIndexedQueue.js';
import HashLinkedQueue from './HashLinkedQueue.js';
import MapLinkedQueue from './MapLinkedQueue.js';
import MapIndexedQueue from './MapIndexedQueue.js';
import SetQueue from './SetQueue.js';


function test(Queue) {
	describe(Queue.name, () => {
		const i1 = { id: 'foo', value: '/path/to/foo.ext' };
		const i2 = { id: 'bar', value: '/path/to/bar.ext' };
		const i3 = { id: 'qux', value: '/path/to/qux.ext' };
		const initial = [i1, i2, i3];

		describe('constructor', () => {
			it('should accept an iterable of items', () => {
				const q = new Queue(initial)
				expect(q.enque()).to.equal(3);
			});
		});

		describe('deque', () => {
			context('when queue is NOT empty', () => {
				it('should return the item at the front of the queue', () => {
					const q = new Queue(initial);

					expect(q.deque()).to.equal(i1);
					expect(q.deque()).to.equal(i2);
					expect(q.deque()).to.equal(i3);
				});
			});

			context('when queue is empty', () => {
				it('should do nothing', () => {
					const q = new Queue();

					expect(q.deque()).to.equal(null);
				});
			});
		});

		describe('enque', () => {
			context('when queue is NOT empty', () => {
				const i4 = { id: 'zed', value: '/path/to/zed.ext' };
				const i5 = { id: 'abc', value: '/path/to/abc.ext' };

				it('should add new and attach to the existing chain', () => {
					const q = new Queue([i1]);

					expect(q.enque(i4)).to.equal(2);
					expect(q.enque(i5)).to.equal(3);
				});
			});

			context('when queue is empty', () => {
				it('should add new and attach to the existing chain', () => {
					const q = new Queue();

					expect(q.enque(i1)).to.equal(1);
					expect(q.enque(i2)).to.equal(2);
				});
			});
		});
	});
}

test(HashIndexedQueue);
test(HashLinkedQueue);
test(MapLinkedQueue);
test(MapIndexedQueue);
test(SetQueue);
