
let stuff = [];
let ray;
function setup() {
  createCanvas(800, 800);
  stuff.push(new Boundary(300,200,50));
  ray = new Ray(100,200,0);
}

function draw() 
{
  background(0);
  ray.show();
  for( let s of stuff)
  {
    s.show();
  }

  const d = signedDistance( ray, stuff[0]);
  ray.show(d);
}

function signedDistance(ray, blob)
{
  const d = p5.Vector.dist(ray.pos, blob.pos);
  return d - blob.r;
}


function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    saveCanvas('raymarching.jpg');
  }
}

function mousePressed(event) {
}

function mouseDragged(event) {
}


// function mouseReleased(event) {
// }
