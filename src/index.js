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

  delete(value, parent = undefined, comparator = defaultComparator) {
    const difference = comparator(this.value, value);
    if (difference === 1) {
      return this.right ? this.right.delete(value, this, comparator) : false;
    }
    if (difference === -1) {
      return this.left ? this.left.delete(value, this, comparator) : false;
    }
    if (difference === 0) {
      if (this.left && this.right) {
        this.value = this.right.minimum;
        return this.right.delete(this.value, this, comparator);
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
    return false;
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
}

export default BinarySearchTree;
