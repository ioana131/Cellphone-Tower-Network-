class DisjointSet {
  constructor(elements) {
    this.parent = {};
    this.rank = {};

// stores parent of each node and rank for union by rank optimization
    elements.forEach((element) => {
      this.parent[element] = element;
      this.rank[element] = 0;
    });
  }

  find(element) {
    // path compression
    if (this.parent[element] !== element) {
      this.parent[element] = this.find(this.parent[element]);
    }

    return this.parent[element];
  }

  union(a, b) {
    // find roots
    const rootA = this.find(a);
    const rootB = this.find(b);
// already connected
    if (rootA === rootB) {
      return false;
    }

    // union by rank
    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }

    return true;
  }
}

export default DisjointSet;