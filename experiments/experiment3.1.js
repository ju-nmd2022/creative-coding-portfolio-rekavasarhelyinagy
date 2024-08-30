function setup() {
  createCanvas(1000, 1000);
  //noiseSeed(99);
  //noLoop();
}

let time = 0;

function draw() {
  background(0);
  
  const NUM_LINES =7;
  let LINE_HEIGHT = height/NUM_LINES;
  
  const noiseScale = 0.5;
  const noiseStrength = 30;
  
  
              let noiseVal = []; 
  
  for (let l=0; l <NUM_LINES; l++) {
   
    let xoff = l + time;
    
    // create an array of random noise values 
    for (let i = 0; i < width; i++) { 
        noiseVal[i] = noise(xoff) * height; 
        xoff += 0.01; 
    } 
  
    // draw lines based on the noise values 
    stroke(255); 
    strokeWeight(l);
    noFill(); 
    beginShape(); 
    for (let x = 0; x < width; x++) { 
        vertex(x, noiseVal[x]); 
      // console.log(l + " "+x+ " " + noiseVal[x]);
    } 
    endShape(); 
    
  }
  time += 0.01;
}



//Reference to the code: https://editor.p5js.org/ObjectART/sketches/GHM_1s6_6

