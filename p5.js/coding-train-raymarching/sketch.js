
let objects = [];
let ray;
function setup() {
  createCanvas(1200, 800);
  for( let i = 0; i < 50; i++)
  {
    let r = random(10,50); 
    let x = random(r, width - r);
    let y = random(r, height - r);
    objects.push(new Boundary(x, y, r));
  }
  
  ray = new Ray(width/2, height/2, 0);
}

function draw() 
{
  background(0);
  for( let s of objects)
  {
    s.show();
  }

  ray.march(objects);
  ray.rotate(0.1 * (deltaTime/1000));
}

function signedDistance(a, b, r)
{
  const d = p5.Vector.dist(a, b);
  return d - r;
}

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    saveCanvas('raymarching.jpg');
  }
}

function mousePressed(event) {}

function mouseDragged(event) {}


// function mouseReleased(event) {
// }
