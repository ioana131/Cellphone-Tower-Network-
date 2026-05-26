class HeapNode {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class MinHeap {
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

  extractMin() {
    if (!this.root) {
      return null;
    }

    const minNode = {
      value: this.root.value,
      priority: this.root.priority,
    };

    const deepestNode = this.getDeepestNode();

    if (deepestNode === this.root) {
      this.root = null;
      return minNode;
    }

    this.root.value = deepestNode.value;
    this.root.priority = deepestNode.priority;

    if (deepestNode.parent.left === deepestNode) {
      deepestNode.parent.left = null;
    } else {
      deepestNode.parent.right = null;
    }

    this.heapifyDown(this.root);

    return minNode;
  }

  heapifyUp(node) {
    while (
      node.parent &&
      node.priority < node.parent.priority
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
      let smallest = node;

      if (
        node.left &&
        node.left.priority < smallest.priority
      ) {
        smallest = node.left;
      }

      if (
        node.right &&
        node.right.priority < smallest.priority
      ) {
        smallest = node.right;
      }

      if (smallest === node) {
        break;
      }

      [node.value, smallest.value] = [
        smallest.value,
        node.value,
      ];

      [node.priority, smallest.priority] = [
        smallest.priority,
        node.priority,
      ];

      node = smallest;
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

  peek() {
    if (!this.root) {
      return null;
    }

    return {
      value: this.root.value,
      priority: this.root.priority,
    };
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

export default MinHeap;