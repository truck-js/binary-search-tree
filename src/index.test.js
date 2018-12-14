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
  describe('Deletes a node using a custom comparator', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      const comparator = (existing, value) => {
        if (value.value > existing.value) {
          return 1;
        }
        return value.value < existing.value ? -1 : 0;
      };
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert({ value: 5 });
      binarySearchTree.insert({ value: 15 });
      result = binarySearchTree.delete({ value: 15 }, undefined, comparator);
    });

    test('Deletes the node on the right', () => {
      expect(binarySearchTree.right).toBe(undefined);
    });

    test('Returns a successful result', () => {
      expect(result).toBe(true);
    });
  });

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

  describe('Deletes a value to the left with a child to it\'s right', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert(5);
      binarySearchTree.insert(7);
      binarySearchTree.insert(15);
      result = binarySearchTree.delete(5);
    });

    test('Deletes the node', () => {
      expect(binarySearchTree.left.value).toBe(7);
    });

    test('Keeps the node to the right intact', () => {
      expect(binarySearchTree.right.value).toBe(15);
    });

    test('Returns a successful result', () => {
      expect(result).toBe(true);
    });
  });

  describe('Deletes a value to the left with a child to it\'s left', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert(5);
      binarySearchTree.insert(3);
      binarySearchTree.insert(15);
      result = binarySearchTree.delete(5);
    });

    test('Deletes the node', () => {
      expect(binarySearchTree.left.value).toBe(3);
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
      binarySearchTree.insert(13);
      result = binarySearchTree.delete(15);
    });

    test('Deletes the node', () => {
      expect(binarySearchTree.left.value).toBe(5);
    });

    test('Keeps the node to the left intact', () => {
      expect(binarySearchTree.right.value).toBe(13);
    });

    test('Returns a successful result', () => {
      expect(result).toBe(true);
    });
  });

  describe('Deletes a node with multiple children (to the left)', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert(5);
      binarySearchTree.insert(3);
      binarySearchTree.insert(7);
      binarySearchTree.insert(15);
      result = binarySearchTree.delete(5);
    });

    test('Swaps the smallest value on the node\'s right with the deleted node', () => {
      expect(binarySearchTree.left.value).toBe(7);
    });

    test('Keeps the original node\'s children intact', () => {
      expect(binarySearchTree.left.left.value).toBe(3);
    });

    test('Returns a successful result', () => {
      expect(result).toBe(true);
    });
  });

  describe('Deletes a node with multiple children (to the right)', () => {
    let binarySearchTree;
    let result;

    beforeAll(() => {
      binarySearchTree = new BinarySearchTree(10);
      binarySearchTree.insert(5);
      binarySearchTree.insert(15);
      binarySearchTree.insert(13);
      binarySearchTree.insert(17);
      result = binarySearchTree.delete(15);
    });

    test('Swaps the smallest value on the node\'s right with the deleted node', () => {
      expect(binarySearchTree.right.value).toBe(17);
    });

    test('Keeps the original node\'s children intact', () => {
      expect(binarySearchTree.right.left.value).toBe(13);
    });

    test('Returns a successful result', () => {
      expect(result).toBe(true);
    });
  });
});

describe('.insert()', () => {
  let binarySearchTree;

  beforeAll(() => {
    binarySearchTree = new BinarySearchTree(10);
    binarySearchTree.insert(5);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(15);
    binarySearchTree.insert(13);
    binarySearchTree.insert(17);
    binarySearchTree.insert(17);
  });

  test('Inserts the first node to the left', () => {
    expect(binarySearchTree.left.value).toBe(5);
  });

  test('Inserts the first node to the right', () => {
    expect(binarySearchTree.right.value).toBe(15);
  });

  test('Inserts the left child of the left node', () => {
    expect(binarySearchTree.left.left.value).toBe(3);
  });

  test('Inserts the right child of the left node', () => {
    expect(binarySearchTree.left.right.value).toBe(7);
  });

  test('Inserts the left child of the right node', () => {
    expect(binarySearchTree.right.left.value).toBe(13);
  });

  test('Inserts the right child of the right node', () => {
    expect(binarySearchTree.right.right.value).toBe(17);
  });
});
