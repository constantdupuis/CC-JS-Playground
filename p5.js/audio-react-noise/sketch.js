
class ParticleSystem
{

}
class Particle
{
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  ttl = -1000;

  constructor( posx, posy)
  {
    this.x = posx;
    this.y = posy;
    this.ttl = -1000;
  }

  setVelocity( nvx, nvy)
  {
    this.vx = nvx;
    this.vy = nvy;
  }

  update( deltaTime)
  {
    const lDeltaTime = deltaTime/1000; // milliseconds to seconds

    this.x += this.vx * lDeltaTime;
    this.y += this.vy * lDeltaTime;

    if( this.ttl != -1000 )
    {
      if( this.ttl > 0)
      {
        //console.log("ttl before update : " + this.ttl + " deltaTime : " + lDeltaTime);
        this.ttl -= lDeltaTime;
        //console.log("ttl after update : " + this.ttl);
        if( this.ttl < 0) 
        {
          //console.log("particle is dead");
          this.ttl = 0;
        }
      }
    }
  }

  setTimeToLive( ttl)
  {
    this.ttl = ttl;
  }

  immortal()
  {
    this.ttl = -1000;
  }

  get isDead()
  {
    if( this.ttl == -1000) return false;
    if( this.ttl == 0) return true;
    return false;
  }

  get isAlive()
  {
    if( this.ttl == -1000) return true;
    if( this.ttl > 0) return true;
    return false;
  }

  toString()
  {
    return "Particle x : " + this.x + " y : " + this.y;
  }
}

let particles = [];
let particlesCount = 1;

function setup() {
    //SetCanvasSize();
    createCanvas(800, 800);
    angleMode(DEGREES);

    // Noise settings
    // noiseSeed(195735482);
    // noiseDetail(3, 0.5);

    NoiseMapGenerate(width, height);
    NoiseMapShowStats();

    for( x = 0; x < particlesCount; x++)
    {
      const p = new Particle(random(width), random(height));
      p.setVelocity( random() * 100, random() * 100);
      p.setTimeToLive(2 + random(5));
      particles.push(p);
    }

    background(220);
    NoiseMapDraw();
    // Turn off the draw loop.
    //noLoop();
}


// function windowResized() {
//   console.log("windowResized");
//   SetCanvasSize();
// }



function draw() {
  
  stroke(0);
  //noStroke();
  noFill();
  for( x = 0; x < particlesCount; x++)
  {
    const p = particles[x];
    if( p.isAlive ){
      circle(p.x, p.y, 10);
      console.log("particule  : " + x + " pos x : "  + p.x + " y : " + p.y);
      console.log("deltaTime  : " + deltaTime);
      // const n = NoiseMapGetAt(p.x, p.y);
      // //console.log("noise pour particule  : " + x + "  = "  + n);
      // const vx = cos(n*360) * 100;
      // const vy = sin(n*360) * 100;
      // //console.log("new velocity x : " + vx + "  y :"  + vy);
      // p.setVelocity(vx, vy);
      p.update(deltaTime);
      KeepInside(p);
    }

  }
  //NoiseMapDraw();
}

function KeepInside(p)
{
  if( p.x < 0 ) 
  {
    p.x = width;
  }
  else if(p.x > width)
  {
    p.x = 0;
  }

  if( p.y < 0 ) 
  {
    p.y = height;
  }
  else if(p.y > height)
  {
    p.y = 0;
  }
}

let noiseMap = [];
let noiseMapWidth = 0;
let noiseMapHeight = 0;
let noiseMapSize = 0;
let noiseScale = 0.005;
let noiseOctaveNumber = 4;
let noiseOctaveFalloff = 0.45;
let noiseMapSeed = 49852321;
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