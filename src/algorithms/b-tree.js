class BTreeNode {
  constructor(isLeaf = true) {
    this.keys = [];
    this.children = [];
    this.isLeaf = isLeaf;
  }
} 
//create B-Tree
class BTree {
  constructor(minDegree = 2) {
    this.root = new BTreeNode(true); //create empty root
    this.minDegree = minDegree; //controls maximum number of keys per node
  }
  search(id, node = this.root) {
    let index = 0;
 // find correct position for the ID
    while (
      index < node.keys.length &&
      id > node.keys[index].id
    ) {
      index++;
    }
// tower found
    if (
      index < node.keys.length &&
      id === node.keys[index].id
    ) {
      return node.keys[index];
    }
// if leaf node reached and tower not found
    if (node.isLeaf) {
      return null;
    }
 // continue search in correct child node
    return this.search(id, node.children[index]);
  }
  insert(tower) {
    const root = this.root;
 // if root is full, split it and create new root
    if (root.keys.length === 2 * this.minDegree - 1) {
      const newRoot = new BTreeNode(false);
      // old root becomes child of new root
      newRoot.children.push(root);
  // split old root
      this.splitChild(newRoot, 0);

      // insert tower into correct node
      this.insertNonFull(newRoot, tower);
// update root
      this.root = newRoot;
    } else {
      this.insertNonFull(root, tower);  // insert normally if root is not full
    }
  }
  insertNonFull(node, tower) {
    let index = node.keys.length - 1;
  // if node is a leaf, insert tower in correct position
    if (node.isLeaf) {
      while (
        index >= 0 &&
        tower.id < node.keys[index].id
      ) {
        node.keys[index + 1] = node.keys[index];
        index--;
      }

      node.keys[index + 1] = tower;  // insert tower in correct position
    } else {
        // find correct child node
      while (
        index >= 0 &&
        tower.id < node.keys[index].id
      ) {
        index--;
      }

      index++;
 // if child node is full, split it
      if (
        node.children[index].keys.length ===
        2 * this.minDegree - 1
      ) {
        this.splitChild(node, index);
 // decide which side to continue insertion
        if (tower.id > node.keys[index].id) {
          index++;
        }
      }
 // continue insertion recursively
      this.insertNonFull(node.children[index], tower);
    }
  }
  splitChild(parent, index) {
    const minDegree = this.minDegree;
    const fullChild = parent.children[index];  // node that is too full
    const newChild = new BTreeNode(fullChild.isLeaf); // create new node
// move middle key to parent
    parent.keys.splice(index, 0, fullChild.keys[minDegree - 1]);
// move right-side keys into new child
    newChild.keys = fullChild.keys.splice(minDegree);
      // remove moved middle key from old child
    fullChild.keys.splice(minDegree - 1);
// if node has children, split children too
    if (!fullChild.isLeaf)  {
      newChild.children = fullChild.children.splice(minDegree);
    }
  // attach new child to parent
    parent.children.splice(index + 1, 0, newChild);
  }
  traverse(node = this.root, result = []) {
    let index;

    // go through all keys in sorted order
    for (index = 0; index < node.keys.length; index++) {

      // visit left child first
      if (!node.isLeaf) {
        this.traverse(node.children[index], result);
      }

      // add current key
      result.push(node.keys[index]);
    }

    // visit last child
    if (!node.isLeaf) {
      this.traverse(node.children[index], result);
    }
    return result;
  }
}
export default BTree;