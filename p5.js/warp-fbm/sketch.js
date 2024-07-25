//let colorScale = chroma.scale(['#DEF9C4', '#468585']);
//let colorScale = chroma.scale(['#D6EFD8', '#1A5319']);
//let colorScale = chroma.scale(['#EEEEEE', '#DC5F00']);
//let colorScale = chroma.scale(['#DAD3BE', '#002125']);
//let colorScale = chroma.scale(['#002125', '#DAD3BE']); // 10/10
//let colorScale = chroma.scale(['#DAD3BE', '#002125']);
//let colorScale = chroma.scale(['#00112A', '#6BDFDB']);

let colorScale = chroma.scale(['#173B45', '#B43F3F', '#FF8225', '#F8EDED']);
//let colorScale = chroma.scale(['#F8EDED', '#FF8225', '#B43F3F','#173B45' ]);
//let colorScale = chroma.scale(['#B5C18E', '#F7DCB9', '#DEAC80', '#914F1E']);

//let colorScale = chroma.scale(['#FF0000', '#00FF00']);

function keyPressed() {
  if ((key == 'S') || (key == 's')) {
    console.time('Save canvas to png');
    saveCanvas('warp-fbm.jpg');
    console.timeEnd('Save canvas to png');
  }
}

let noiseOctaveNumber = 6;
let noiseOctaveFalloff = 0.5;
let noiseMapSeed = -1; //48462321; //49852321
let noiseScale = 0.01;// 0.003

function setup() {
    createCanvas(800, 800);

    noiseDetail(noiseOctaveNumber, noiseOctaveFalloff);

    if( noiseMapSeed != -1)
      noiseSeed(noiseMapSeed);
}

function draw() {

  background(0);
  //loadPixels();
  for( let i = 0; i < width; i++)
  {
    for( let j = 0; j < height; j++ )
    {
      let p = createVector(i / 100, j / 100); // Scale down the coordinates
      let c = pattern(p);
      let col = map(c.o, 0, 1, 0, 255);
      stroke(col);
      fill(col);
      square(i,j, 10);
      // let col2 = map(c.q.x, 0, 1, 0, 255);
      // let col3 = map(c.q.y, 0, 1, 0, 255);

      // let fcolor = color(col, col2, 20);
      // //console.log(`c.q ${c.q}`);
      // //console.log(`c.o ${c.o}`);
      // //console.log(`col ${col}`);
      // stroke(fcolor);
      // fill(fcolor);
      // square(i,j, 2);
      //circle(i, j , 2);
      // stroke(color(col));
      //point(i, j);
    }
  }
  //updatePixels();
  noLoop();
}

function fbm(p) {
  return noise(p.x, p.y);
}

function pattern(p) {
  let q = createVector(
    fbm(p.copy().add(createVector(0.0, 0.0))),
    fbm(p.copy().add(createVector(5.2, 1.3)))
  );
  let o = fbm(p.copy().add(q.copy().mult(4.0))); 
  return {o, q};
}

