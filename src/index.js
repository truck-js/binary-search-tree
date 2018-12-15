import Queue from '@truck/queue';
import isFunction from 'lodash.isfunction';

const defaultComparator = (existing, value) => {
  if (value > existing) {
    return 1;
  }
  return value < existing ? -1 : 0;
};

class BinarySearchTree {
  constructor(value) {
    this.left = undefined;
    this.right = undefined;
    this.value = value;
  }

  get maximum() {
    return this.right ? this.right.maximum : this.value;
  }

  get minimum() {
    return this.left ? this.left.minimum : this.value;
  }

  delete(value, parent = undefined) {
    const difference = isFunction(value) ? value(this.value) : defaultComparator(this.value, value);
    if (difference === 1) {
      return this.right ? this.right.delete(value, this) : false;
    }
    if (difference === -1) {
      return this.left ? this.left.delete(value, this) : false;
    }
    if (this.left && this.right) {
      this.value = this.right.minimum;
      return this.right.delete(this.value, this);
    }
    if (parent.left === this) {
      // eslint-disable-next-line no-param-reassign
      parent.left = this.left ? this.left : this.right;
    }
    if (parent.right === this) {
      // eslint-disable-next-line no-param-reassign
      parent.right = this.left ? this.left : this.right;
    }
    return true;
  }

  insert(value, comparator = defaultComparator) {
    const difference = comparator(this.value, value);
    if (difference === 1) {
      if (this.right) {
        this.right.insert(value, comparator);
      } else {
        this.right = new BinarySearchTree(value);
      }
    } else if (difference === -1) {
      if (this.left) {
        this.left.insert(value, comparator);
      } else {
        this.left = new BinarySearchTree(value);
      }
    }
  }

  search(value) {
    const difference = isFunction(value) ? value(this.value) : defaultComparator(this.value, value);
    if (difference === 1) {
      return this.right ? this.right.search(value) : undefined;
    }
    if (difference === -1) {
      return this.left ? this.left.search(value) : undefined;
    }
    return this;
  }

  traverseBreadthFirst(callback) {
    const queue = new Queue();
    queue.enqueue(this);
    while (!queue.isEmpty()) {
      const item = queue.dequeue();
      const { left, right } = item;
      callback(item);
      if (left) {
        queue.enqueue(left);
      }
      if (right) {
        queue.enqueue(right);
      }
    }
  }

  traverseDepthFirstPreOrder(callback) {
    const { left, right } = this;
    callback(this);
    if (left) {
      left.traverseDepthFirstPreOrder(callback);
    }
    if (right) {
      right.traverseDepthFirstPreOrder(callback);
    }
  }

  traverseDepthFirstInOrder(callback) {
    const { left, right } = this;
    if (left) {
      left.traverseDepthFirstInOrder(callback);
    }
    callback(this);
    if (right) {
      right.traverseDepthFirstInOrder(callback);
    }
  }

  traverseDepthFirstPostOrder(callback) {
    const { left, right } = this;
    if (left) {
      left.traverseDepthFirstPostOrder(callback);
    }
    if (right) {
      right.traverseDepthFirstPostOrder(callback);
    }
    callback(this);
  }
}

export default BinarySearchTree;
