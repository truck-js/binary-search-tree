import BinarySearchTree from './index';

describe('.maximum', () => {
  let binarySearchTree;
  let maximum;

  beforeAll(() => {
    binarySearchTree = new BinarySearchTree(10);
    binarySearchTree.insert(5);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(15);
    binarySearchTree.insert(13);
    binarySearchTree.insert(17);
    ({ maximum } = binarySearchTree);
  });

  test('Returns the maximum value', () => {
    expect(maximum).toBe(17);
  });
});

describe('.minimum', () => {
  let binarySearchTree;
  let minimum;

  beforeAll(() => {
    binarySearchTree = new BinarySearchTree(10);
    binarySearchTree.insert(5);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(15);
    binarySearchTree.insert(13);
    binarySearchTree.insert(17);
    ({ minimum } = binarySearchTree);
  });

  test('Returns the minimum value', () => {
    expect(minimum).toBe(3);
  });
});

describe('.delete()', () => {
  describe('Fails to delete a node that is too large', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert(5);
      binarySearchTree.insert(15);
      result = binarySearchTree.delete(1000);
    });

    test('Keeps the node to the left intact', () => {
      expect(binarySearchTree.left.value).toBe(5);
    });

    test('Keeps the node to the right intact', () => {
      expect(binarySearchTree.right.value).toBe(15);
    });

    test('Returns a failed result', () => {
      expect(result).toBe(false);
    });
  });

  describe('Fails to delete a node that is too small', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert(5);
      binarySearchTree.insert(15);
      result = binarySearchTree.delete(1);
    });

    test('Keeps the node to the left intact', () => {
      expect(binarySearchTree.left.value).toBe(5);
    });

    test('Keeps the node to the right intact', () => {
      expect(binarySearchTree.right.value).toBe(15);
    });

    test('Returns a failed result', () => {
      expect(result).toBe(false);
    });
  });

  describe('Deletes a value to the left', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert(5);
      binarySearchTree.insert(15);
      result = binarySearchTree.delete(5);
    });

    test('Deletes the node', () => {
      expect(binarySearchTree.left).toBe(undefined);
    });

    test('Keeps the node to the right intact', () => {
      expect(binarySearchTree.right.value).toBe(15);
    });

    test('Returns a successful result', () => {
      expect(result).toBe(true);
    });
  });

  describe('Deletes a value to the right', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert(5);
      binarySearchTree.insert(15);
      result = binarySearchTree.delete(15);
    });

    test('Deletes the node', () => {
      expect(binarySearchTree.left.value).toBe(5);
    });

    test('Keeps the node to the left intact', () => {
      expect(binarySearchTree.right).toBe(undefined);
    });

    test('Returns a successful result', () => {
      expect(result).toBe(true);
    });
  });
});
