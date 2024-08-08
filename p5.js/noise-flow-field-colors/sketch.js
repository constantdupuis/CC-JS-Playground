
//let colorScale = chroma.scale(['#DEF9C4', '#468585']);
//let colorScale = chroma.scale(['#D6EFD8', '#1A5319']);
//let colorScale = chroma.scale(['#EEEEEE', '#DC5F00']);
//let colorScale = chroma.scale(['#DAD3BE', '#002125']);
//let colorScale = chroma.scale(['#002125', '#DAD3BE']); // 10/10
//let colorScale = chroma.scale(['#DAD3BE', '#002125']);
//let colorScale = chroma.scale(['#00112A', '#6BDFDB']);

//let colorScale = chroma.scale(['#173B45', '#B43F3F', '#FF8225', '#F8EDED']); // 8/10
//let colorScale = chroma.scale(['#F8EDED', '#FF8225', '#B43F3F','#173B45' ]); // 8/10
//let colorScale = chroma.scale(['#B5C18E', '#F7DCB9', '#DEAC80', '#914F1E']);

//let colorScale = chroma.scale(['#EF9C66', '#FCDC94', '#C8CFA0', '#78ABA8']); // 7/10
//let colorScale = chroma.scale(['#365E32', '#81A263', '#E7D37F', '#FD9B63']); // 6/10

let colorScale = chroma.scale(['#FD9B63', '#E7D37F', '#81A263', '#365E32']);

//let colorScale = chroma.scale(['#FF0000', '#00FF00']);

//let colorScale = chroma.scale(['#1A3636', '#677D6A']);
//let colorScale = chroma.scale(['#677D6A', '#1A3636']);

let noiseMap;
let particleSystem;
let noiseSpeed = 20;
let rotationOffsetRadian;

let step = 1;

function setup() {

    createCanvas(1600, 900);
    //angleMode(DEGREES);

    noiseMap = new NoiseMap(1600, 900);
    noiseMap.setScale(0.003);
    //noiseMap.setSeed(946653215);
    noiseMap.generate();
    //noiseMap.normalize();

    particleSystem = new ParticleSystem(5000);
    particleSystem.setLocationBoundaries(0,1600,0, 900);
    particleSystem.setTimeToLiveFromTo(60, 120);
    particleSystem.setRebirthParamsFunction( ParticleSystem.centeredRingRebirthParams);
    //particleSystem.setTimeToLive(60 * 1); // Time to live in seconds
    particleSystem.generateParticles();

    let c = color(colorScale(0).alpha(1.0).hex());
    background(c);

    hideDoneMarker();

    rotationOffsetRadian = random(TWO_PI);

    console.log(`rotationOffsetRadian ${rotationOffsetRadian}`);
}

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    saveCanvasEx('colored-noise-flow-field');
  }
}

function draw() {
      
  fill(64,0,0,2);
  noStroke();

  let c;

  particleSystem.forEachAlive((p, index) =>{
    c = color(colorScale(p.ttl01).alpha(0.1).hex());
    fill(c);
    circle(p.x, p.y, 2);
    let n = noiseMap.noiseAt(p.x, p.y);
    const vx = cos( (n*TWO_PI) + rotationOffsetRadian ) * noiseSpeed;
    const vy = sin( (n*TWO_PI) + rotationOffsetRadian ) * noiseSpeed;
    p.setVelocity(vx, vy);
  });
  
  particleSystem.update(deltaTime);

  if( particleSystem.allParticlesDead)
  {
    console.log('All particles are gone, stop here');
    step = 2;
    showDoneMarker();
    noLoop(); 
  }
   
}

 // Function to show the element
 function showDoneMarker() {
  let el = document.getElementById('doneMarker');
  if( el )
    el.style.display = 'block';
}

// Function to hide the element
function hideDoneMarker() {
  let el = document.getElementById('doneMarker');
  if( el )
    el.style.display = 'none';
}

