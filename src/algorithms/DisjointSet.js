class DisjointSet {
  constructor(elements) {
    this.parent = {};
    this.rank = {};

    // initially every tower is its own parent
    elements.forEach((element) => {
      this.parent[element] = element;
      this.rank[element] = 0;
    });
  }

  find(element) {
    if (this.parent[element] !== element) {
      this.parent[element] = this.find(this.parent[element]);
    }
    return this.parent[element];
  }
  
  union(a, b) {
    // find main parents of both towers
    const rootA = this.find(a);
    const rootB = this.find(b);

    // towers already belong to same group
    if (rootA === rootB) {
      return false;
    }
// connect one parent under the stronger parent
    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;

    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;

    } else {

      // if ranks are equal, choose one root and increase rank
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }
    return true;
  }
}

export default DisjointSet;