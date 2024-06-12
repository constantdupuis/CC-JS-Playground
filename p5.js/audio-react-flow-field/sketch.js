



let particles = [];
let particlesCount = 100;
let noiseSpeed = 80;
let particlesAlpha = 2;
let particlesAlive = particlesCount;

let sound;
let binsCount;
let fft;
let spectrum;

let isRunning = false;

const particulesToBins = new Map();

function preload()
{
  console.time('load audio file');
  sound = loadSound('assets/A night in Tunisia.mp3');
  console.timeEnd('load audio file');
}

function setup() {
    //SetCanvasSize();
    const canvas = createCanvas(1200, 800);
    canvas.mouseClicked(togglePlay);
    angleMode(DEGREES);

    // Noise settings
    // noiseSeed(195735482);
    // noiseDetail(3, 0.5);
    fft = new p5.FFT();
    fft.smooth(0.7);
    binsCount = fft.bins;
    sound.amp(0.2);

    NoiseMapGenerate(width, height);
    NoiseMapShowStats();

    particlesAlive = particlesCount;
    for( x = 0; x < particlesCount; x++)
    {
      const p = new Particle(random(width), random(height));
      //const p = new Particle(width * 0.5, height * 0.95);
      //p.setVelocity( random() * 100, random() * 100);
      p.setTimeToLive(180);
      particles.push(p);
      particulesToBins[x] = floor(random(0, binsCount / 2));
    }

    background(255);
    //NoiseMapDraw();
    // Turn off the draw loop.
    //noLoop();
}


// function windowResized() {
//   console.log("windowResized");
//   SetCanvasSize();
// }



function draw() {
  if( !isRunning) return;
  //stroke(0, 32);
  noStroke();
  //noFill();
  fill(0, particlesAlpha);

  spectrum = fft.analyze();
  //console.log("Spectrum length : " + spectrum.length);
  let binIdx = 0;
  let binValue = 0;
  for( x = 0; x < particlesCount; x++)
  {
    const p = particles[x];
    if( p.isAlive ){
      //point(p.x, p.y);
      binIdx = particulesToBins[x];
      //console.log("Bin index : " + binIdx);
      binValue = spectrum[binIdx];
      binValue /= 255.0;
      //console.log("Bin value : " + binValue * 50);
      circle(p.x, p.y, 1 + binValue * 100);
      //console.log("particule  : " + x + " pos x : "  + p.x + " y : " + p.y);
      //console.log("deltaTime  : " + deltaTime);
      const n = NoiseMapGetAt(p.x, p.y);
      //console.log("noise pour particule  : " + x + "  = "  + n);
      const vx = cos(n*360) * noiseSpeed;
      const vy = sin(n*360) * noiseSpeed;
      //console.log("new velocity x : " + vx + "  y :"  + vy);
      p.setVelocity(vx, vy);
      p.update(deltaTime);

      if( p.isAlive)
      {
        KeepInside(p);
      }else {
        particlesAlive--;
      }
      
    }

    if( particlesAlive == 0)
    {
      
    }
  }
  //NoiseMapDraw();
}

function togglePlay() {
  if (sound.isPlaying()) {
    isRunning = false;
    console.log('pause audio play');
    sound.pause();
  } else {
    isRunning = true;
    console.log('start audio play');
    sound.play();
  }
}

function KeepInside(p)
{
  if( p.x < 0 || p.x > width-1 || p.y < 0 || p.y > height-1)
  {
    p.x = random(width);
    p.y = random(height);
  }
  // if( p.x < 0 ) 
  // {
  //   p.x = width-1;
  // }
  // else if(p.x >= width)
  // {
  //   p.x = 0;
  // }

  // if( p.y < 0 ) 
  // {
  //   p.y = height-1;
  // }
  // else if(p.y >= height)
  // {
  //   p.y = 0;
  // }
}

let noiseMap = [];
let noiseMapWidth = 0;
let noiseMapHeight = 0;
let noiseMapSize = 0;
let noiseScale = 0.005;
let noiseXOffset = 0;
let noiseYOffset = 0;
let noiseOctaveNumber = 4;
let noiseOctaveFalloff = 0.45;
let noiseMapSeed = 484623458921; //49852321
let noiseMapMaxNoise = 0;
let noiseMapMinNoise = 1;

function NoiseMapGenerate(nmWidth, nmHeight)
{
  console.time('generate noisemap');
  noiseMap = [];
  noiseMapWidth = nmWidth;
  noiseMapHeight = nmHeight;
  noiseMapSize = noiseMapWidth * noiseMapHeight;
  noiseMapMaxNoise = 0;
  noiseMapMinNoise = 1;

  noiseDetail(noiseOctaveNumber, noiseOctaveFalloff);
  if( noiseMapSeed != -1)
    noiseSeed(noiseMapSeed);

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
  console.timeEnd('generate noisemap');
}

function NoiseMapGetAt(x,y)
{
  x = floor(x);
  y = floor(y);
  if( noiseMapSize == 0) return -1;
  const noiseIndex = (y * width) + x;
  if( noiseIndex < noiseMapSize)
  {
    return noiseMap[noiseIndex];
  }
  return -1;
}

function NoiseMapDraw()
{
  console.time("draw noise map");
  for( let i =0; i < width; i++)
    for(let j = 0; j < height; j++)
  {
    let n = 255 * NoiseMapGetAt(i,j);
    
    stroke(n);
    point(i,j);
  }
  console.timeEnd("draw noise map");
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