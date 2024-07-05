
//colorScale = chroma.scale(['#FD9B63', '#E7D37F','#81A263', '#365E32']);
//colorScale = chroma.scale(['#78ABA8', '#C8CFA0','#FCDC94', '#EF9C66']);
//colorScale = chroma.scale(['#1A5319', '#508D4E','#80AF81', '#D6EFD8']);
//colorScale = chroma.scale(['#468585', '#50B498','#9CDBA6', '#DEF9C4']);
//colorScale = chroma.scale(['#131842', '#E68369','#ECCEAE', '#FBF6E2']); // 10/10
//colorScale = chroma.scale(['#E2D0C1', '#382100']);
//colorScale = chroma.scale(['#A2B8B4', '#002F38']);

colorScale = chroma.scale(['#A2B8B4', '#003826']);

function setup() {
  createCanvas(1600, 2560);
  noLoop();
}

function draw() 
{
  background(255);

  noFill();
  stroke(0);
  strokeWeight(1);

  // let squareW = 15;

  // for( let i = 0; i < width; i += squareW)
  //   for( let j = 0; j< height; j += squareW)
  //     draw_square( i, j, squareW, 4 - random(2), random(TWO_PI));

  let c = color( colorScale(0.0).alpha(0.25).hex() );
  stroke(c);

  let squareW = 15;

  for( let i = 0; i < width; i += squareW)
    for( let j = 0; j< height; j += squareW)
      draw_square( i, j, squareW, 4 - random(2), random(TWO_PI));


  c = color( colorScale(0.55).alpha(0.25).hex() );
  stroke(c);

  squareW = 50;

  for( let i = 0; i < width; i += squareW)
    for( let j = 0; j< height; j += squareW)
      draw_square( i, j, squareW, 4 - random(2), random(TWO_PI));
  
  c = color( colorScale(0.85).alpha(0.25).hex() );
  stroke(c);

  squareW = 50;

  for( let i = 0; i < width; i += squareW)
    for( let j = 0; j< height; j += squareW)
      draw_square( i, j, squareW, 4 - random(2), random(TWO_PI));

  c = color( colorScale(1.0).alpha(0.25).hex() );
  stroke(c);

  squareW = 100;

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
