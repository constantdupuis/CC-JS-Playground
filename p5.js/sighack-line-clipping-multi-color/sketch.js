
//colorScale = chroma.scale(['#FD9B63', '#E7D37F','#81A263', '#365E32']);
//colorScale = chroma.scale(['#78ABA8', '#C8CFA0','#FCDC94', '#EF9C66']);
//colorScale = chroma.scale(['#1A5319', '#508D4E','#80AF81', '#D6EFD8']);
//colorScale = chroma.scale(['#468585', '#50B498','#9CDBA6', '#DEF9C4']);
//colorScale = chroma.scale(['#131842', '#E68369','#ECCEAE', '#FBF6E2']);
colorScale = chroma.scale(['#323232', '#323232']);

let cellWidth = 40;
let halfCellWidth = 25;
let xCellCounts = 0;
let yCellCounts = 0;

let noiseScale = 0.1;

function setup() {
  //createCanvas(2560, 1600);
  //createCanvas(1600 , 2560);
  //createCanvas(1600 , 1000);
  createCanvas(1920 , 1200);

  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  noLoop();
}

function draw() 
{
  background(255);

  
  noStroke();

  noiseSeed(Date.now() + 789165416);

  cellWidth = 40;
  xCellCounts = Math.ceil(width / cellWidth) ;
  yCellCounts = Math.ceil(height / cellWidth) ;

  for( let i = 0; i < xCellCounts; i++)
  {
    for( let j = 0; j < yCellCounts; j++)
    {
      let noiseVal = noise(i*noiseScale, j*noiseScale);
      noiseVal *= noiseVal;
      //console.log(`noise value ${noiseVal}`);
      //fill(noiseVal * 255, 0, 0, 255/3);
      //fill(noiseVal * 255);
      //rect( i * halfCellWidth,  j * halfCellWidth, halfCellWidth, halfCellWidth);
      stroke(0,255,255,(noiseVal * 255)/1.2);
      strokeWeight( 1 + random(3));
      draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
      //rect( i * cellWidth,  j * cellWidth, cellWidth, cellWidth);
    }
  }

  noiseSeed(Date.now() + 32165944987);

  cellWidth = 50;
  xCellCounts = Math.ceil(width / cellWidth);
  yCellCounts = Math.ceil(height / cellWidth);

  for( let i = 0; i < xCellCounts; i++)
  {
    for( let j = 0; j < yCellCounts; j++)
    {
      let noiseVal = noise(width+i*noiseScale, width+j*noiseScale);
      noiseVal *= noiseVal; 
      //console.log(`noise value ${noiseVal}`);
      //fill(noiseVal * 255);
      //fill(0, noiseVal * 255, 0, 255/3);
      //rect( width /2 + i * halfCellWidth,  j * halfCellWidth, halfCellWidth, halfCellWidth);
      stroke(255,255,0, (noiseVal * 255)/1.2);
      strokeWeight( 1 + random(3));
      draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
      //rect(  i * cellWidth,  j * cellWidth, cellWidth, cellWidth);
    }
  }


  noiseSeed(Date.now() + 44987321659);

  cellWidth = 20;
  xCellCounts = Math.ceil(width / cellWidth);
  yCellCounts = Math.ceil(height / cellWidth);

  for( let i = 0; i < xCellCounts; i++)
    {
      for( let j = 0; j < yCellCounts; j++)
      {
        let noiseVal = noise(width+i*noiseScale, width+j*noiseScale);
        noiseVal *= noiseVal; 
        //console.log(`noise value ${noiseVal}`);
        //fill(noiseVal * 255);
        //fill(0, noiseVal * 255, 0, 255/3);
        //rect( i * halfCellWidth,  height /2 + j * halfCellWidth, halfCellWidth, halfCellWidth);
        stroke(255,0,255, (noiseVal * 255)/1.2);
        strokeWeight( 1 + random(3));
        draw_square( i * cellWidth,  j * cellWidth, cellWidth, 6 - random(2), random(TWO_PI));
        //rect( i * cellWidth,  + j * cellWidth, cellWidth, cellWidth);
      }
    }

    // for( let i = 0; i < xCellCounts; i++)
    //   {
    //     for( let j = 0; j < yCellCounts; j++)
    //     {
    //       let noiseVal = noise(i*noiseScale, j*noiseScale);
    //       //console.log(`noise value ${noiseVal}`);
    //       fill(0, 0, noiseVal * 255, 255/3);
    //       rect( i * cellWidth,  j * cellWidth, cellWidth, cellWidth);
    //     }
    //   }

  return;

  noFill();
  stroke(0);
  strokeWeight(1);

  let squareW = 1000;

  let c = color( colorScale(0.0).alpha(0.25).hex() );
  stroke(c);

  squareW = 15;

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
    console.log('Save canvas');
    const date = new Date();
    let month = (date.getMonth() + 1).toString();
    month = month.padStart(2,'0');
    let day = date.getDate().toString();
    day = day.padStart(2, '0');
    const formattedDate = `${date.getFullYear()}_${month}_${day}`;
    console.log(formattedDate);
    saveCanvas(`line-clipping-color-${formattedDate}-${width}x${height}.jpg`);
  }
}

function mousePressed(event) {}

function mouseDragged(event) {}


// function mouseReleased(event) {
// }
