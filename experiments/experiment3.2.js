let colors = [];
let time = 0;

function setup() {
  createCanvas(1000, 1000);
  
  const NUM_LINES = 7;
  
  
  for (let l = 0; l < NUM_LINES; l++) {
    let r = random(50, 255); 
    let g = random(50, 255); 
    let b = random(50, 255); 
    colors.push([r, g, b]);
  }
}

function draw() {
  background(0, 0, 128);
  
  const NUM_LINES = 7;
  let LINE_HEIGHT = height / NUM_LINES;
  
  const noiseScale = 1;
  const noiseStrength = 100;
  
  let noiseVal = []; 
  
  for (let l = 0; l < NUM_LINES; l++) {
   
    let xoff = l + time;
    
    // Create an array of random noise values 
    for (let i = 0; i < width; i++) { 
        noiseVal[i] = noise(xoff) * height; 
        xoff += 0.01; 
    } 
  
    // Draw lines using the pre-generated colors
    stroke(colors[l][0], colors[l][1], colors[l][2]); // Use stored color
    strokeWeight(l + 1); // Adjusting strokeWeight to be at least 1
    noFill(); 
    beginShape(); 
    for (let x = 0; x < width; x++) { 
        vertex(x, noiseVal[x]); 
    } 
    endShape(); 
  }
  
  time += -0.01; // Increment time for animation
}
