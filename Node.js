class Node extends Cell {
  constructor(i, j, totalCells) {
    super(i, j, totalCells);
    this.hCost_ = 0;
    this.gCost_ = 0;
    this.parent = null;
  }

  setBorder(b) {
    this.border = b;
  }

  setParent(p) {
    this.parent = p;
  }

  getParent() {
    return this.parent;
  }

  get fCost() {
    return this.gCost_ + this.hCost_;
  }

  get hCost() {
    return this.hCost_;
  }

  set hCost(val) {
    this.hCost_ = val;
  }


  get gCost() {
    return this.gCost_;
  }

  set gCost(val) {
    this.gCost_ = val;
  }

  equals(that) {
    if(that instanceof Node) {
      return that.i === this.i && that.j === this.j;
    } else {
      throw new Error('Invalid Argument ' + that);
    }
  }

}