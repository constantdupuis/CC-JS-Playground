function setup() {
    //SetCanvasSize();
    createCanvas(800, 800);

    // Noise settings
    // noiseSeed(195735482);
    // noiseDetail(3, 0.5);

    console.time('generate noisemap');
    GenerateNoiseMap(width, height);
    console.timeEnd('generate noisemap');

    NoiseMapShowStats()


    // Turn off the draw loop.
    noLoop();
}


// function windowResized() {
//   console.log("windowResized");
//   SetCanvasSize();
// }



function draw() {
  background(220);
  console.time("draw");
  for( let i =0; i < width; i++)
    for(let j = 0; j < height; j++)
  {
    // let n = 255 * noise(i*0.01,j*0.01);
    //console.time('peek noise');
    let n = 255 * GetNoiseFromMap(i,j);
    //console.timeEnd('peek noise');

    //console.time('drawPoint');
    stroke(n);
    point(i,j);
    //console.timeEnd('drawPoint');
  }
  console.timeEnd("draw");
}

let noiseMap = [];
let noiseMapWidth = 0;
let noiseMapHeight = 0;
let noiseMapSize = 0;
let noiseScale = 0.01;
let noiseOctaveNumber = 4;
let noiseOctaveFalloff = 0.5;
let noiseMapSeed = 49852321;
let noiseMapMaxNoise = 0;
let noiseMapMinNoise = 1;

function GenerateNoiseMap(nmWidth, nmHeight)
{
  noiseMap = [];
  noiseMapWidth = nmWidth;
  noiseMapHeight = nmHeight;
  noiseMapSize = noiseMapWidth * noiseMapHeight;
  noiseMapMaxNoise = 0;
  noiseMapMinNoise = 1;

  noiseDetail(noiseOctaveNumber, noiseOctaveFalloff);
  noiseSeed(noiseSeed);

  for( let i = 0; i < noiseMapWidth; i++)
  {
    for( let j = 0; j < noiseMapHeight; j++)
    {
      const noiseIndex = (j * noiseMapWidth) + i;
      const noiseVal = noise( i * noiseScale, j * noiseScale);

      if( noiseVal > noiseMapMaxNoise) noiseMapMaxNoise = noiseVal;
      if( noiseVal < noiseMapMinNoise) noiseMapMinNoise = noiseVal;

      noiseMap[noiseIndex] = noiseVal;
    }
  }
}

function GetNoiseFromMap(x,y)
{
  if( noiseMapSize == 0) return -1;
  const noiseIndex = (y * width) + x;
  if( noiseIndex < noiseMapSize)
  {
    return noiseMap[noiseIndex];
  }
  return -1;
}

function NoiseMapShowStats()
{
  console.log("Noise Map ");
  console.log("Noise Min :  " + noiseMapMinNoise);
  console.log("Noise Max :  " + noiseMapMaxNoise);
}

function SetCanvasSize()
{
  
  // Set size base on HTML body size
  //const bodyEl = select('body');
  //console.log("BODY width " + bodyEl.width + " height " + bodyEl.height)
  //resizeCanvas(bodyEl.width * 0.95, bodyEl.height * 0.95);

  // Set a fixed size
  resizeCanvas(800, 800);
}