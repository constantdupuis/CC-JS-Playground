function setup() {
    const bodyEl = select('body');
    console.log("BODY width " + bodyEl.width + " height " + bodyEl.height);
    //const canvas = createCanvas(bodyEl.width - 20, bodyEl.height - 20);
    const canvas = createCanvas(bodyEl.width * 0.95, bodyEl.height * 0.95);
    //canvas.center();
  }
  
  function draw() {
    background(220);
  }