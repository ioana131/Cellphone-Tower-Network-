class HeapNode {
  constructor(value, priority) {
    // one node in the heap
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

    // first inserted node becomes root
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // find first free position level by level
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

    // root contains the smallest priority
    const minNode = {
      value: this.root.value,
      priority: this.root.priority,
    };

    const deepestNode = this.getDeepestNode();

    // case with only one node
    if (deepestNode === this.root) {
      this.root = null;
      return minNode;
    }

    // replace root with deepest node
    this.root.value = deepestNode.value;
    this.root.priority = deepestNode.priority;

    // remove deepest node
    if (deepestNode.parent.left === deepestNode) {
      deepestNode.parent.left = null;
    } else {
      deepestNode.parent.right = null;
    }

    // restore min heap order
    this.heapifyDown(this.root);

    return minNode;
  }

  heapifyUp(node) {
    // move node up while its priority is smaller than parent's priority
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
    // move node down until the smallest priority is on top
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

    // finds last node in level-order traversal
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

    // returns smallest node without removing it
    return {
      value: this.root.value,
      priority: this.root.priority,
    };
  }

  toTreeArray() {
    const result = [];

    // converts heap into array format for visualization
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