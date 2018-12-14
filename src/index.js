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

  delete(value, comparator = defaultComparator, parent = undefined) {
    const difference = comparator(this.value, value);
    if (difference === 1) {
      return this.right ? this.right.delete(value, comparator, this) : false;
    }
    if (difference === -1) {
      return this.left ? this.left.delete(value, comparator, this) : false;
    }
    if (this.left && this.right) {
      this.value = this.right.minimum;
      return this.right.delete(this.value, comparator, this);
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
}

export default BinarySearchTree;
