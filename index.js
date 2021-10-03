const TOP = 0;
const LEFT = 1;
const BOTTOM = 2;
const RIGHT = 3;

const sizeScaleFactor = 1.2;
const cellPerRow = 50;

let canvasSize = {
  w: 0,
  h: 0,
};
let canvasTrueSize = 0;

let startSolving = false;

let controller, grid, solver, res;


function windowResized() {
  Object.assign(canvasSize, {
    w: windowWidth / sizeScaleFactor,
    h: windowHeight / sizeScaleFactor
  });
  canvasTrueSize = Math.min(canvasSize.w, canvasSize.h);
  resizeCanvas(canvasTrueSize, canvasTrueSize);
}


function setup() {
  Object.assign(canvasSize, {
    w: windowWidth / sizeScaleFactor,
    h: windowHeight / sizeScaleFactor
  });
  canvasTrueSize = Math.min(canvasSize.w, canvasSize.h);

  createCanvas(canvasTrueSize, canvasTrueSize);

  grid = new Grid(cellPerRow);
  controller = new Controller(grid);
  // frameRate(20);
  background(52);
}

function draw() {
  if(startSolving) {
    res = solver.solve();
    if(res !== false) {
      res.forEach((node) => {
        // grid.getCell(node.i, node.j).mark('#343232');
        // const c = grid.getCell(node.i, node.j);
        // vertex(c.x + c.w/2, c.y + c.w/2);
        // point(c.x + c.w/2, c.y + c.w/2);
      });
      startSolving = false;
    }
  } 

  if(controller.isComplete() && !startSolving) {
    if(!solver) {
      // controller.currentCell = null;
      controller.markStartEnd();
      solver = new Solver(controller.getMaze(), controller.getStartIndex(), controller.getEndIndex());
    }
  }
  let cycles = controller.isComplete() ? 1 : 1;
  for(let i = 0; i < cycles; i++) {
    controller.update();
  }
  if(res) {
    noFill();
    stroke('yellow');
    beginShape();
    res.forEach((node, counter) => {
      // grid.getCell(node.i, node.j).mark('#343232');
      const c = grid.getCell(node.i, node.j);
      if(counter === 0) {
        vertex(c.w/2, c.w/2)
      }
      vertex(c.x + c.w/2, c.y + c.w/2);

      // point(c.x + c.w/2, c.y + c.w/2);
    });
    endShape();
  }
}

function keyPressed() {
  if(keyCode === 32 && controller.isComplete()) {
    startSolving = true;
  }
}