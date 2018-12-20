// eslint-disable-next-line import/no-extraneous-dependencies
const Benchmark = require('benchmark');

// eslint-disable-next-line import/no-unresolved
const BinarySearchTree = require('../lib/index').default;

const suite = new Benchmark.Suite();

const testLength = process.argv[2] || 10000;
const binarySearchTree = new BinarySearchTree(testLength / 2);
const array = new Array(testLength);

for (let down = testLength / 2; down >= 0; down -= 1) {
  binarySearchTree.insert(down);
  array.push(down);
}

for (let up = (testLength / 2) + 1; up < testLength; up += 1) {
  binarySearchTree.insert(up);
  array.push(up);
}

process.stdout.write(`\nRunning benchmark with ${testLength} items:\n\n`);

suite
  .add('Array#find()              ', () => {
    const a = array.find(item => item === testLength);
    array.push(a);
  })
  .add('BinarySearchTree#search() ', () => {
    const a = binarySearchTree.search(item => item === testLength);
    binarySearchTree.insert(a);
  })
  .on('cycle', (event) => {
    process.stdout.write(`${String(event.target)}\n`);
  })
  .on('complete', function complete() {
    process.stdout.write(`Fastest is ${this.filter('fastest').map('name')}\n`);
  })
  .run({ async: true });
