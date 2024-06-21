
let objects = [];
let ray;
function setup() {
  createCanvas(800, 800);
  for( let i = 0; i < 3;i++)
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
  //ray.show();
  for( let s of objects)
  {
    s.show();
  }

  ray.march(objects);

  // const d = signedDistance( ray, stuff[0]);
  // ray.show(d);
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
