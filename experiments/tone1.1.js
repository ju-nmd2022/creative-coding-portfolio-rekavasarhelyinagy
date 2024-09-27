// Particle Class
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 100 + Math.random() * 100;
    this.size = random(5, 35); // Random size between 5 and 35
    this.color = color(random(255), random(255), random(255), 255);
    this.shapeType = Math.floor(random(3)); // Randomly pick a shape type (0, 1, or 2)
  }

  update() {
    this.lifespan--;
    this.velocity.mult(1); // Slow down the velocity over time
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(this.color); // Use the random color for each particle

    // Draw a different shape based on the shapeType
    if (this.shapeType === 0) {
      drawStar(0, 0, this.size / 2, this.size / 8, 5); // Star
    } else if (this.shapeType === 1) {
      ellipse(0, 0, this.size); // Circle
    } else if (this.shapeType === 2) {
      rectMode(CENTER);
      rect(0, 0, this.size, this.size); // Square
    }

    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

// Function to draw a star
function drawStar(x, y, outerRadius, innerRadius, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * outerRadius;
    let sy = y + sin(a) * outerRadius;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * innerRadius;
    sy = y + sin(a + halfAngle) * innerRadius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  blendMode(BLEND);
}

// Array to hold particles
let particles = [];

// Initialize Tone.js Synth
let synth = new Tone.Synth().toDestination();

// Function to generate particles
function generateParticles(x, y) {
  for (let i = 0; i < 50; i++) { // Generate particles
    const px = x + random(-50, 50); // Larger range for spreading particles
    const py = y + random(-50, 50);
    const particle = new Particle(px, py);
    particles.push(particle);
  }

  // Play a sound when particles are generated
  let note = random(['C4', 'D4', 'E4', 'G4', 'A4']); // Note selection
  synth.triggerAttackRelease(note, '1n'); // Play note for a short duration
}

function draw() {
  background(0, 8, 78, 10);

  for (let particle of particles) {
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }
}

function mouseClicked() {
  generateParticles(mouseX, mouseY);
}
