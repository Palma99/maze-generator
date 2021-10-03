class Solver {
  constructor(grid, startIndex, endIndex) {
    this.grid = grid;
    this.closed = [];
    this.open = [];

    this.startIndex = startIndex;
    this.endIndex = endIndex;
    
    this.nodes = new Grid(this.grid.cellsPerRow, true);

    
    this.nodes.getGrid().forEach((node, i) => {
      node.setBorder(this.grid.getCell(i).getBorder());
    });

    this.targetNode = this.nodes.getCell(this.grid.getGridLength() - 1);
    this.startNode = this.nodes.getCell(this.startIndex);
    this.startNode.gCost = this.startNode.getDistance(this.targetNode);
    this.startNode.hCost = Infinity
    this.open.push(this.startNode)
  }

  solve() {
    // console.log('solving');
    // const unvisitedNeighbours = this.nodes.hasNeighbours();
    if(this.open.length > 0) {
      // Node with lowest fCost
      let currentNode = this.open[0];
      let cni = 0;
      for(let i = 1; i < this.open.length; i++) {
        if(this.open[i].fCost < currentNode.fCost 
        || (this.open[i].fCost === currentNode.fCost && this.open[i].hCost < currentNode.hCost)) {
          currentNode = this.open[i];
          cni = i;
        }
      }

      // Remove from open and add to closed
      this.open.splice(cni, 1);

      if(!this.isInClosed(currentNode)) {
        this.closed.push(currentNode);
      }

      if(currentNode.equals(this.nodes.getCell(this.endIndex))) {
        // done
        return this.retracePath(this.startNode, this.targetNode);
      }
      this.grid.getCell(currentNode.i, currentNode.j).setColor('purple');
      // console.log(this.nodes.hasNeighbours(currentNode, true));
      for(let neighbourObj of this.nodes.hasNeighbours(currentNode)) {
        
        // console.log(neighbour, neighbour.cell.border[neighbour.position]);
        // console.log(neighbour);
        const neighbour = neighbourObj.cell;
        if(this.isInClosed(neighbour) || neighbour.getBorder()[neighbourObj.borderToRemove] === true) {
          continue;
        }
        // console.log(neighbour);
        // console.log(neighbourObj, neighbour.getBorder()[neighbourObj.borderToRemove]);
        const newMovementCostNeighbour = currentNode.gCost + currentNode.getDistance(neighbour);
        if(newMovementCostNeighbour < neighbour.gCost || !this.isInOpen(neighbour)) {
          neighbour.gCost = newMovementCostNeighbour;
          neighbour.hCost = neighbour.getDistance(this.targetNode);
          neighbour.setParent(currentNode);
          // console.log(neighbour);
          // console.log(this.nodes.getCell(neighbour.i, neighbour.j));
          if(!this.isInOpen(neighbour)) {
            this.open.push(neighbour);
          }
        }
      }
    }
    return false
  }

  isInClosed(node) {
    for(const n of this.closed) {
      if(node.equals(n)) {
        return true;
      }
    }
    return false;
  }

  isInOpen(node) {
    for(const n of this.open) {
      if(n.equals(node)) {
        return true;
      }
    }
    return false;
  }



  retracePath(start, end) {
    let path = [];
    let currentNode = end;

    const isInPath = (node) => {
      for(const n of path) {
        if(n.equals(node)) {
          return true;
        }
      }
      return false;
    }

    while(!currentNode.equals(start)) {
      if(!isInPath(currentNode)) {
        path.push(currentNode);
      }
      currentNode = currentNode.getParent();
    }
    path = path.reverse();
    return path;
  }

}