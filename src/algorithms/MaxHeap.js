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
    // heap starts empty
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
  
//must find where to place next node 
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      // insert as left child
      if (!current.left) {
        current.left = newNode;
        newNode.parent = current;

        // restore max heap property
        this.heapifyUp(newNode);
        return;
      }

      queue.push(current.left);

      // insert as right child
      if (!current.right) {
        current.right = newNode;
        newNode.parent = current;

        // restore max heap property
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

    // saves the root node before replacing it
    const maxNode = {
      value: this.root.value,
      priority: this.root.priority,
    };

    const deepestNode = this.getDeepestNode();

    // case with only one node
    if (deepestNode === this.root) {
      this.root = null;
      return maxNode;
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

    // restore heap structure
    this.heapifyDown(this.root);

    return maxNode;
  }

  heapifyUp(node) {
    // move node upward while priority is larger
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
    // move node downward until heap is valid again
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

      // stop if current node is already largest
      if (largest === node) {
        break;
      }

      // swap values and priorities
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

    // finds last node in the heap
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