class Grid {
  constructor(cr, node = false) {
    this.cellsPerRow = cr;
    this.cells = [];
    for (let i = 0; i < cr; i++) {
      for (let j = 0; j < cr; j++) {
        if (!node) {
          this.cells.push(new Cell(j, i, cr));
        } else {
          this.cells.push(new Node(j, i, cr));
        }
      }
    }
  }

  getGrid() {
    return this.cells;
  }

  getGridLength() {
    return this.cells.length;
  }

  getCell(i, j = undefined) {
    const index = j === undefined ? i : j * this.cellsPerRow + i;
    return this.cells[index];
  }


  hasNeighbours(cell) {
    if (cell instanceof Cell) {
      let notVisitedNeighbours = [];

      // Top
      let rOffset = cell.i - 1;
      let cOffset = cell.j;
      let neighbour = null;

      if (!this.outOfMatrix(rOffset) && !this.outOfMatrix(cOffset)) {
        neighbour = this.getCell(rOffset, cOffset);
        if (!neighbour.isVisited()) {
          notVisitedNeighbours.push({
            position: TOP,
            positionStr: 'top',
            borderToRemove: BOTTOM,
            cell: neighbour
          });
        }
      }

      // Left
      rOffset = cell.i;
      cOffset = cell.j - 1;
      if (!this.outOfMatrix(rOffset) && !this.outOfMatrix(cOffset)) {

        neighbour = this.getCell(rOffset, cOffset);
        if (!neighbour.isVisited()) {
          notVisitedNeighbours.push({
            position: LEFT,
            positionStr: 'left',
            borderToRemove: RIGHT,
            cell: neighbour
          });

        }
      }

      // Bottom
      rOffset = cell.i + 1;
      cOffset = cell.j;
      if (!this.outOfMatrix(rOffset) && !this.outOfMatrix(cOffset)) {

        neighbour = this.getCell(rOffset, cOffset);
        if (!neighbour.isVisited()) {
          notVisitedNeighbours.push({
            position: BOTTOM,
            positionStr: 'bottom',
            borderToRemove: TOP,
            cell: neighbour
          });

        }
      }

      // Right
      rOffset = cell.i;
      cOffset = cell.j + 1;
      if (!this.outOfMatrix(rOffset) && !this.outOfMatrix(cOffset)) {

        neighbour = this.getCell(rOffset, cOffset);
        if (!neighbour.isVisited()) {
          notVisitedNeighbours.push({
            position: RIGHT,
            positionStr: 'right',
            borderToRemove: LEFT,
            cell: neighbour
          });
        }

      }

      return notVisitedNeighbours;
    } else {
      throw new Error('Invalid argument');
    }
  }

  outOfMatrix(val) {
    return val < 0 || val >= this.cellsPerRow;
  }

}