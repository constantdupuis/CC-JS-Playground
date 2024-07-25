//let colorScale = chroma.scale(['#DEF9C4', '#468585']);
//let colorScale = chroma.scale(['#D6EFD8', '#1A5319']);
//let colorScale = chroma.scale(['#EEEEEE', '#DC5F00']);
//let colorScale = chroma.scale(['#DAD3BE', '#002125']);
//let colorScale = chroma.scale(['#002125', '#DAD3BE']); // 10/10
//let colorScale = chroma.scale(['#DAD3BE', '#002125']);
//let colorScale = chroma.scale(['#00112A', '#6BDFDB']);

let colorScale = chroma.scale(['#173B45', '#B43F3F', '#FF8225', '#F8EDED']);
//let colorScale = chroma.scale(['#F8EDED', '#FF8225', '#B43F3F','#173B45' ]);
//let colorScale = chroma.scale(['#B5C18E', '#F7DCB9', '#DEAC80', '#914F1E']);

//let colorScale = chroma.scale(['#FF0000', '#00FF00']);

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    console.time('Save canvas to png');
    saveCanvas('warp-fbm.jpg');
    console.timeEnd('Save canvas to png');
  }
}

let noiseOctaveNumber = 6;
let noiseOctaveFalloff = 0.5;
let noiseMapSeed = -1; //48462321; //49852321
let noiseScale = 0.01;// 0.003

let squareWidth = 40;

function setup() {
    createCanvas(800, 800);

    noiseDetail(noiseOctaveNumber, noiseOctaveFalloff);

    if( noiseMapSeed != -1)
      noiseSeed(noiseMapSeed);
}

function draw() {

  background(255,0,0);
  console.log('Start draw');
  for( let i = 0; i < width; i++)
  {
    for( let j = 0; j < height; j++ )
    {
      let col = floor(i / squareWidth);
      let row = floor(j / squareWidth);
      if( col % 2 == row % 2)
      {
        stroke(0);
        fill(0);
      }
      else{
        stroke(255);
        fill(255);
      }
      // const angle = PI/6;
      // let ni = i*Math.cos(angle) - j * Math.sin(angle);
      // let nj = i*Math.sin(angle) + j * Math.cos(angle);
      let ni = i;
      let nj = j + Math.sin(i/10)*10;
      square(ni,nj, 2);
    }
  }
  console.log('End draw');
  noLoop();
}

function fbm(p) {
  return noise(p.x, p.y);
}



