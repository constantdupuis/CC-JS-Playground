
let sound;

function preload()
{
  console.time('load audio file');
  sound = loadSound('assets/A night in Tunisia.mp3');
  console.timeEnd('load audio file');
}


function setup() {
    const canvas = createCanvas(800, 800);
    canvas.mouseClicked(togglePlay);

    fft = new p5.FFT();
    fft.smooth(0.7);
    sound.amp(0.2);
  }
  
  function draw() {
    background(220);

    let spectrum = fft.analyze();
    noStroke();
    fill(255, 0, 255);
    for (let i = 0; i< spectrum.length; i++){
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      rect(x, height, width / spectrum.length, h )
    }

    text('tap to play', 20, 20);
  }

  function togglePlay() {
    if (sound.isPlaying()) {
      console.log('pause audio play');
      sound.pause();
    } else {
      console.log('start audio play');
      sound.play();
    }
  }