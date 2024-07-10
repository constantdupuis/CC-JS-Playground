
//colorScale = chroma.scale(['#FD9B63', '#E7D37F','#81A263', '#365E32']);
//colorScale = chroma.scale(['#78ABA8', '#C8CFA0','#FCDC94', '#EF9C66']);
//colorScale = chroma.scale(['#1A5319', '#508D4E','#80AF81', '#D6EFD8']);
//colorScale = chroma.scale(['#468585', '#50B498','#9CDBA6', '#DEF9C4']);
//colorScale = chroma.scale(['#131842', '#E68369','#ECCEAE', '#FBF6E2']);
colorScale = chroma.scale(['#323232', '#323232']);

let cellWidth = 40;
let halfCellWidth = cellWidth / 2;
let xCellCounts = 0;
let yCellCounts = 0;

let noiseScale = 0.1;

function setup() {
  //createCanvas(2560, 1600);
  //createCanvas(1600 , 2560);
  createCanvas(1600, 1000);

  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  noLoop();
}

function draw() 
{
  drawPerlinNoiseBaseSquare();
}

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    console.log('Save canvas');
    const date = new Date();
    let month = (date.getMonth() + 1).toString();
    month = month.padStart(2,'0');
    let day = date.getDate().toString();
    day = day.padStart(2, '0');
    const formattedDate = `${date.getFullYear()}_${month}_${day}`;
    console.log(formattedDate);
    saveCanvas(`line-clipping-bw-${formattedDate}-${width}x${height}.jpg`);
  }
}

function drawSimpleOverlayedSquare()
{
  background(255);

  noFill();
  stroke(0);
  strokeWeight(1);


  // for( let i = 0; i < width; i += squareW)
  //   for( let j = 0; j< height; j += squareW)
  //     draw_square( i, j, squareW, 50, PI / 5.123);


  // return;

  noiseSeed(Date.now() + 789165416);

  cellWidth = 40;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  let c = color( colorScale(0.0).alpha(0.25).hex() );
  stroke(c);


  for( let i = 0; i < width; i += cellWidth)
    for( let j = 0; j< height; j += cellWidth)
      draw_square( i, j, cellWidth, 4 - random(2), random(TWO_PI));

  c = color( colorScale(0.55).alpha(0.25).hex() );
  stroke(c);

  cellWidth = 50;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < width; i += cellWidth)
    for( let j = 0; j< height; j += cellWidth)
      draw_square( i, j, cellWidth, 4 - random(2), random(TWO_PI));
  c = color( colorScale(0.85).alpha(0.25).hex() );
  stroke(c);

  cellWidth = 50;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < width; i += cellWidth)
    for( let j = 0; j< height; j += cellWidth)
      draw_square( i, j, cellWidth, 4 - random(2), random(TWO_PI));

  c = color( colorScale(1.0).alpha(0.25).hex() );
  stroke(c);

  cellWidth = 100;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < width; i += cellWidth)
    for( let j = 0; j< height; j += cellWidth)
      draw_square( i, j, cellWidth, 4 - random(2), random(TWO_PI));
}

function drawPerlinNoiseBaseSquare()
{
  background(255);

  noFill();
  stroke(0);
  strokeWeight(1);


  // for( let i = 0; i < width; i += squareW)
  //   for( let j = 0; j< height; j += squareW)
  //     draw_square( i, j, squareW, 50, PI / 5.123);


  // return;

  noiseSeed(Date.now() + 789165416);

  cellWidth = 40;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < width; i += cellWidth)
    for( let j = 0; j< height; j += cellWidth)
  {
    let noiseVal = noise(i*noiseScale, j*noiseScale);
      noiseVal *= noiseVal;
      let c = color( colorScale(0.0).alpha(noiseVal).hex() );
  stroke(c);
    draw_square( i, j, cellWidth, 4 - random(2), random(TWO_PI));
  }
      

  c = color( colorScale(0.55).alpha(0.25).hex() );
  stroke(c);

  cellWidth = 50;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < width; i += cellWidth)
    for( let j = 0; j< height; j += cellWidth)
      draw_square( i, j, cellWidth, 4 - random(2), random(TWO_PI));
  c = color( colorScale(0.85).alpha(0.25).hex() );
  stroke(c);

  cellWidth = 50;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < width; i += cellWidth)
    for( let j = 0; j< height; j += cellWidth)
      draw_square( i, j, cellWidth, 4 - random(2), random(TWO_PI));

  c = color( colorScale(1.0).alpha(0.25).hex() );
  stroke(c);

  cellWidth = 100;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < width; i += cellWidth)
    for( let j = 0; j< height; j += cellWidth)
      draw_square( i, j, cellWidth, 4 - random(2), random(TWO_PI));
}

function mousePressed(event) {}

function mouseDragged(event) {}


// function mouseReleased(event) {
// }
