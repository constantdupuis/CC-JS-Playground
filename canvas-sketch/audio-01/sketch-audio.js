const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const eases = require('eases');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate : true
};

let manager;
let audio;
let audioContext, audioData, audioDataBytes, sourceNode, analyserNode;
let mappedAudioData;

const sketch = () => {

  const numCircles = 8;
  const numSlices = 9;
  const slice = Math.PI * 2 / numSlices;
  const radius = 100;

  const bins = [];
  const lineWidths = [];

  let lineWidth, bin, mapped;

  for( let i = 0; i < numCircles * numSlices; i++)
  {
    bin = random.rangeFloor(4, 100);
    if( random.value() > 0.5) bin = 0;
    bins.push(bin);
  }

  for( let i = 0; i < numCircles; i++)
  {
    const t = i / (numCircles -1);
    lineWidth = eases.quadIn(t) * 200 + 20;
    lineWidths.push( lineWidth);
  }

  //console.log("Sketch");

  return ({ context, width, height, time }) => {
    context.fillStyle = '#EEEAE0';
    context.fillRect(0, 0, width, height);

    if( !audioContext) return;

    //analyserNode.getFloatFrequencyData(audioData);

    //console.log(audioData);

    //const avg = getAverage( audioData);
    // console.log("avg " + avg);
    // const mapped = math.mapRange(avg, analyserNode.minDecibels * 2, analyserNode.maxDecibels, 0,1, true);
    // console.log("mapped " + mapped);
    // const radius = mapped * 200;
    //console.log("radius " + radius);

    analyserNode.getByteFrequencyData(audioDataBytes);

    context.save();
    
    context.translate( width * 0.5, height * 0.5);

    let cradius = radius;

    for( let i = 0; i < numCircles; i++)
    {
      context.save();
      //console.log("i " + i + " time * (0.5 * (numCircles+1)) : " + time * (0.5 * (numCircles+1)));
      context.rotate(time * 0.1 * i);

      for( let j = 0; j < numSlices; j++)
      {
        //console.log("time " + time * 0.1);
        //context.rotate(slice + time * 0.1);
        context.rotate(slice);
        context.lineWidth = lineWidths[i];
        //if( context.lineWidth < 1) continue;

        bin = bins[i * numSlices + j];
        if( bin == 0) continue;

        mapped = math.mapRange(audioDataBytes[bin], 0, 255, 0, 1, true);

        context.lineWidth = lineWidths[i] * mapped;

        context.beginPath();
        context.arc(0, 0, cradius + context.lineWidth * 0.5, 0, slice);
        context.stroke();
      }

      cradius += lineWidths[i];

      context.restore();
    }
    context.restore();

    // analyserNode.getByteFrequencyData(audioDataBytes);

    // let ii = 0;
    // for( let i = 0; i < bins.length; i++)
    // {
    //   ii = i +1;
    //   const bin = bins[i];
    //   //const avg = getAverage( audioDataBytes);
    //   const mapped = math.mapRange(audioDataBytes[bin], 0, 255, 0,1, true);
    //   const radius = mapped * 200 * ii;

    //   console.log(mapped);

    //   context.save();

    //   context.translate( width * 0.5, height * 0.5);
    //   context.lineWidth = 10 * ii;

    //   context.beginPath();
    //   context.arc(0, 0, radius, 0, Math.PI * 2);
    //   context.stroke();

    //   context.restore();
    // }
   
  };
};

const addListeners = () => {
  window.addEventListener('mouseup', () =>{
    if(!audioContext) createAudio();

    if( audio.paused){
      audio.play();
      manager.play();
    } 
    else {
      audio.pause();
      manager.pause();
    }
  })
};

const createAudio = () => {
  audio = document.createElement('audio');
  audio.src = 'media/bye-bye-blackbird-arranged-by-mark-taylor.mp3';

  audioContext = new AudioContext();
  sourceNode = audioContext.createMediaElementSource(audio);
  sourceNode.connect( audioContext.destination);

  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 512;
  analyserNode.smoothingTimeConstant = 0.9;
  // console.log("analyserNode.minDecibels : " + analyserNode.minDecibels);
  // console.log("analyserNode.maxDecibels : " + analyserNode.maxDecibels);
  console.log("analyserNode.frequencyBinCount " + analyserNode.frequencyBinCount);
  
  sourceNode.connect( analyserNode );

  audioData = new Float32Array( analyserNode.frequencyBinCount);
  audioDataBytes = new Uint8Array( analyserNode.frequencyBinCount);
  mappedAudioData  = new Float32Array( analyserNode.frequencyBinCount);
}

const getAverage = (data) =>{
  let sum = 0;
  for( let i = 0; i < data.length; i++)
  {
    sum += data[i]
  }
  return sum / data.length;
};

const start = async () => {
  addListeners();
  manager = await canvasSketch(sketch, settings);
  
  manager.pause()
};

start();

