class Controller {
  constructor(grid) {
    this.grid = grid;
    this.stack = [];

    this.startCellIndex = 0;
    this.endCellIndex = grid.getGridLength() - 1;

    this.currentCell = this.grid.getCell(this.startCellIndex);
    this.currentCell.setVisited(true);
    this.stack.push(this.currentCell);
    this.visitedCell = 1;
  }

  getMaze() {
    return this.grid;
  }

  getStartIndex() {
    return this.startCellIndex;
  }

  getEndIndex() {
    return this.endCellIndex;
  }

  update() {
    if(this.stack.length != 0) {
      this.currentCell = this.stack.pop();

      const neighbours = this.grid.hasNeighbours(this.currentCell);

      if(neighbours.length) {
        this.stack.push(this.currentCell);
        const randomNeighbour = random(neighbours);
        this.currentCell.removeBorder(randomNeighbour.position);
        randomNeighbour.cell.removeBorder(randomNeighbour.borderToRemove);
        randomNeighbour.cell.setVisited(true);
        this.stack.push(randomNeighbour.cell);

        this.visitedCell += 1;
      }
    }


    for(let i = 0; i < this.grid.getGridLength(); i++) {
      const cell = this.grid.getGrid()[i];

      if(cell.equals(this.currentCell)) {
        cell.setColor('red');
      }

      cell.show();
    }
  }

  isComplete() {
    return this.visitedCell === this.grid.getGridLength() && this.stack.length === 0;
  }

  markStartEnd() {
    this.grid.getCell(this.startCellIndex).mark('#8cd15e');
    this.grid.getCell(this.endCellIndex).mark('#4d3ebd');
  }

}