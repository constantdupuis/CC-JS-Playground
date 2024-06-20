
function setup() {
  createCanvas(1600, 800);
  background(255);
}

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    saveCanvas('marble.jpg');
  }
}

function mousePressed(event) {
}

function mouseDragged(event) {
}


// function mouseReleased(event) {
// }


function draw() {

  background(240);

}
