class Cell {
  static DEFAULT_COLOR = '#000';
  static VISITED_COLOR = '#0072fc';

  constructor(i, j, totalCells) {
    this.i = i;
    this.j = j;
    this.totalCells = totalCells;
    this.color = Cell.DEFAULT_COLOR;
    this.border = [true, true, true, true];
    this.visited = false;
    this.w = width / this.totalCells;
    this.y = this.i * this.w;
    this.x = this.j * this.w;
    this.marked = false;
  }

  show() {
    this.w = width / this.totalCells;
    this.y = this.i * this.w;
    this.x = this.j * this.w;

    fill(this.color);
    noStroke()
    rect(this.x, this.y, this.x + this.w, this.y + this.w);

    
    stroke('#000');
    strokeWeight(3);
    
    if(this.border[TOP]) {
      line(this.x, this.y, this.x + this.w, this.y);
    }

    if(this.border[LEFT]) {
      line(this.x, this.y, this.x, this.y + this.w);
    }

    if(this.border[BOTTOM]) {
      line(this.x, this.y + this.w, this.x + this.w, this.y + this.w);
    }

    if(this.border[RIGHT]) {
      line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);
    }

    if(!this.marked) {
      this.color = this.isVisited() ? Cell.VISITED_COLOR : Cell.DEFAULT_COLOR;
    }

    // fill('#fff');
    // textSize(22);
    // text(this.i + '-' + this.j, this.x + 10, this.y + 20);

  }

  mark(color) {
    this.marked = true;
    this.color = color; 
    this.show(); 
  }

  getBorder() {
    return [...this.border];
  }

  removeBorder(border) {
    if(border < 0 || border > 3) {
      throw new Error('Invalid argument: ' + border);
    }

    this.border[border] = false;
  }

  setColor(color) {
    if(this.marked) return; 

    this.color = color;
    return this;
  }

  setVisited(val) {
    this.visited = val;
  }

  isVisited() {
    return this.visited;
  }

  equals(that) {
    if(that instanceof Cell) {
      return that.i === this.i && that.j === this.j;
    } else {
      throw new Error('Invalid Argument ' + that);
    }
  }

  getCoords() {
    return {
      x: this.x, 
      y: this.y
    }
  }

  getDistance(that) {
    if(that instanceof Cell) {
      const c1 = this.getCoords();
      const c2 = that.getCoords();
      return dist(c1.x, c1.y, c2.x, c2.y);
    } else {
      throw new Error('Invalid Argument ' + that);
    }
  }

}