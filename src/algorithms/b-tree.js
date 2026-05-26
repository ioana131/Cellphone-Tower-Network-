class BTreeNode {
  constructor(isLeaf = true) {
    this.keys = [];
    this.children = [];
    this.isLeaf = isLeaf;
  }
}

class BTree {
  constructor(minDegree = 2) {
    this.root = new BTreeNode(true);
    this.minDegree = minDegree;
  }

  search(id, node = this.root) {
    let index = 0;

    while (
      index < node.keys.length &&
      id > node.keys[index].id
    ) {
      index++;
    }

    if (
      index < node.keys.length &&
      id === node.keys[index].id
    ) {
      return node.keys[index];
    }

    if (node.isLeaf) {
      return null;
    }

    return this.search(id, node.children[index]);
  }

  insert(tower) {
    const root = this.root;

    if (root.keys.length === 2 * this.minDegree - 1) {
      const newRoot = new BTreeNode(false);
      newRoot.children.push(root);

      this.splitChild(newRoot, 0);
      this.insertNonFull(newRoot, tower);

      this.root = newRoot;
    } else {
      this.insertNonFull(root, tower);
    }
  }

  insertNonFull(node, tower) {
    let index = node.keys.length - 1;

    if (node.isLeaf) {
      while (
        index >= 0 &&
        tower.id < node.keys[index].id
      ) {
        node.keys[index + 1] = node.keys[index];
        index--;
      }

      node.keys[index + 1] = tower;
    } else {
      while (
        index >= 0 &&
        tower.id < node.keys[index].id
      ) {
        index--;
      }

      index++;

      if (
        node.children[index].keys.length ===
        2 * this.minDegree - 1
      ) {
        this.splitChild(node, index);

        if (tower.id > node.keys[index].id) {
          index++;
        }
      }

      this.insertNonFull(node.children[index], tower);
    }
  }

  splitChild(parent, index) {
    const minDegree = this.minDegree;
    const fullChild = parent.children[index];
    const newChild = new BTreeNode(fullChild.isLeaf);

    parent.keys.splice(index, 0, fullChild.keys[minDegree - 1]);

    newChild.keys = fullChild.keys.splice(minDegree);
    fullChild.keys.splice(minDegree - 1);

    if (!fullChild.isLeaf) {
      newChild.children = fullChild.children.splice(minDegree);
    }

    parent.children.splice(index + 1, 0, newChild);
  }

  traverse(node = this.root, result = []) {
    let index;

    for (index = 0; index < node.keys.length; index++) {
      if (!node.isLeaf) {
        this.traverse(node.children[index], result);
      }

      result.push(node.keys[index]);
    }

    if (!node.isLeaf) {
      this.traverse(node.children[index], result);
    }

    return result;
  }
}

export default BTree;