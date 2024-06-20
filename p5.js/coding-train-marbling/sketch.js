let drops = [];
function setup() {
  createCanvas(1600, 800);
  background(220);
}

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    saveCanvas('marble.jpg');
  }
}

// let isMousePressed = false;

// function mousePressed(event) {
//   console.log('mousePressed');
//   isMousePressed = true;
//   // let drop = new Drop(mouseX, mouseY,100);
//   addInk(mouseX, mouseY,random(10,50));
// }
// /**
//  * This function is called when the mouse is moved.
//  * @param {MouseEvent} event - The `MouseEvent` that is passed as an argument.
//  */
// function mouseMoved(event) {
//   console.log('mouseMoved');
//   if(isMousePressed)
//   {
//     addInk(mouseX, mouseY,random(10,50));
//   }
// }

/**
 * This function is called when the mouse is dragged.
 * @param {MouseEvent} event - The `MouseEvent` that is passed as an argument.
 */
function mouseDragged(event) {
  addInk(mouseX, mouseY,random(10,50));
}


// /**
//  * This function is called when the mouse is released.
//  * @param {MouseEvent} event - The `MouseEvent` that is passed as an argument.
//  */
// function mouseReleased(event) {
//   console.log('mouseReleased');
//   isMousePressed = false;
// }



function addInk(x, y, r)
{
  let drop = new Drop(x, y, r);
  for( let other of drops)
    {
      other.marble(drop);
    }
    drops.push(drop);
}

function draw() {

  // let x = random(width);
  // let y  = random(height);
  // let r = random(10,50);
  // addInk(x,y ,r);

  background(225);
  for (let drop of drops) {
    drop.draw();
  }
}
