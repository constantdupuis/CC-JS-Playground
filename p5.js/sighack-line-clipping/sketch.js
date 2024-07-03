
function setup() {
  createCanvas(1200, 800);
  noLoop();
}

function draw() 
{
  background(255);

  noFill();
  stroke(0);
  strokeWeight(1);

  let squareW = 15;

  for( let i = 0; i < width; i += squareW)
    for( let j = 0; j< height; j += squareW)
      draw_square( i, j, squareW, 4 - random(2), random(TWO_PI));
  
}

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    saveCanvas('line-clipping.jpg');
  }
}

function mousePressed(event) {}

function mouseDragged(event) {}


// function mouseReleased(event) {
// }
