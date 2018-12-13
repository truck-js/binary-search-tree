const defaultComparator = (existing, value) => {
  if (value > existing) {
    return 1;
  }
  if (value < existing) {
    return -1;
  }
  return 0;
};

class BinarySearchTree {
  constructor(value) {
    this.left = undefined;
    this.right = undefined;
    this.value = value;
  }

  findMaximum() {
    return this.right ? this.right.findMaximum() : this.value;
  }

  findMinimum() {
    return this.left ? this.left.findMinimum() : this.value;
  }

  insert(value, comparator = defaultComparator) {
    const difference = comparator(this.value, value);
    if (difference === 1) {
      if (this.right) {
        this.right.insert(value);
      } else {
        this.right = new BinarySearchTree(value);
      }
    } else if (difference === -1) {
      if (this.left) {
        this.left.insert(value);
      } else {
        this.left = new BinarySearchTree(value);
      }
    }
  }
}

export default BinarySearchTree;
