class HeapNode {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class MaxHeap {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  insert(value, priority) {
    const newNode = new HeapNode(value, priority);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      if (!current.left) {
        current.left = newNode;
        newNode.parent = current;
        this.heapifyUp(newNode);
        return;
      }

      queue.push(current.left);

      if (!current.right) {
        current.right = newNode;
        newNode.parent = current;
        this.heapifyUp(newNode);
        return;
      }

      queue.push(current.right);
    }
  }

  extractMax() {
    if (!this.root) {
      return null;
    }

    const maxNode = {
      value: this.root.value,
      priority: this.root.priority,
    };

    const deepestNode = this.getDeepestNode();

    if (deepestNode === this.root) {
      this.root = null;
      return maxNode;
    }

    this.root.value = deepestNode.value;
    this.root.priority = deepestNode.priority;

    if (deepestNode.parent.left === deepestNode) {
      deepestNode.parent.left = null;
    } else {
      deepestNode.parent.right = null;
    }

    this.heapifyDown(this.root);

    return maxNode;
  }

  heapifyUp(node) {
    while (
      node.parent &&
      node.priority > node.parent.priority
    ) {
      [node.value, node.parent.value] = [
        node.parent.value,
        node.value,
      ];

      [node.priority, node.parent.priority] = [
        node.parent.priority,
        node.priority,
      ];

      node = node.parent;
    }
  }

  heapifyDown(node) {
    while (node) {
      let largest = node;

      if (
        node.left &&
        node.left.priority > largest.priority
      ) {
        largest = node.left;
      }

      if (
        node.right &&
        node.right.priority > largest.priority
      ) {
        largest = node.right;
      }

      if (largest === node) {
        break;
      }

      [node.value, largest.value] = [
        largest.value,
        node.value,
      ];

      [node.priority, largest.priority] = [
        largest.priority,
        node.priority,
      ];

      node = largest;
    }
  }

  getDeepestNode() {
    if (!this.root) {
      return null;
    }

    const queue = [this.root];
    let current = this.root;

    while (queue.length > 0) {
      current = queue.shift();

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }

    return current;
  }

  toTreeArray() {
    const result = [];

    const traverse = (node, index = 0, parentIndex = null) => {
      if (!node) {
        return;
      }

      result.push({
        value: node.value,
        priority: node.priority,
        index,
        parentIndex,
        leftChildIndex: node.left ? 2 * index + 1 : null,
        rightChildIndex: node.right ? 2 * index + 2 : null,
      });

      traverse(node.left, 2 * index + 1, index);
      traverse(node.right, 2 * index + 2, index);
    };

    traverse(this.root);

    return result;
  }
}

export default MaxHeap;