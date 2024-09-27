// Particle Class
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.size = random(10, 20); // Larger star size to make fewer stars more visible
    this.mass = this.size / 2; // Mass is proportional to the size
    this.color = this.randomColor(); // Initialize with a random color
    this.hasCollided = false; // To prevent continuous sound on collision
  }

  randomColor() {
    // Generate a random color in RGB format
    return color(random(255), random(255), random(255)); // Random color
  }

  update() {
    this.position.add(this.velocity); // Update position
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(this.color); // Use the particle's color
    drawStar(0, 0, this.size / 2, this.size / 8, 5); 
    pop();
  }

  // Collision detection with another particle
  collidesWith(other) {
    let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return distance < (this.size / 2 + other.size / 2); // Collides if distance is less than the sum of their radii
  }

  // Collision response: Change direction based on simple elastic collision
  handleCollision(other) {
    // Calculate the difference in position
    let diff = p5.Vector.sub(this.position, other.position);
    diff.normalize();

    // Calculate relative velocity
    let relativeVelocity = p5.Vector.sub(this.velocity, other.velocity);
    let speed = relativeVelocity.dot(diff);

    // Only collide if moving towards each other
    if (speed > 0) return;

    // Conservation of momentum
    let impulse = (2 * speed) / (this.mass + other.mass);
    this.velocity.add(p5.Vector.mult(diff, -impulse * other.mass));
    other.velocity.add(p5.Vector.mult(diff, impulse * this.mass));

    // Change both particles' colors to random colors on collision
    this.color = this.randomColor();
    other.color = other.randomColor();
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

// Setup Tone.js Sound
let synth;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0); // Solid black background

  // Initialize a synth with Tone.js
  synth = new Tone.Synth().toDestination();
}

// Array to hold particles
let particles = [];

// Function to generate particles
function generateParticles(x, y) {
  for (let i = 0; i < 10; i++) { // Reduced the number of particles to 10
    const px = x + random(-30, 30); // Smaller range for spreading particles
    const py = y + random(-30, 30);
    const particle = new Particle(px, py);
    particles.push(particle);
  }
}

function draw() {
  background(0); // Clear the canvas with a black background each frame

  // Update and draw each particle
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.update();
    particle.draw();

    // Check for collisions with other particles
    for (let j = i + 1; j < particles.length; j++) {
      let other = particles[j];
      if (particle.collidesWith(other) && !particle.hasCollided) {
        particle.handleCollision(other); // Handle the collision if detected
        playCollisionSound(); // Play sound for collision

        // Prevent the same particles from triggering sound repeatedly
        particle.hasCollided = true;
        other.hasCollided = true;

        // Reset collision state after 1 second
        setTimeout(() => {
          particle.hasCollided = false;
          other.hasCollided = false;
        }, 1000);
      }
    }
  }
}

// Function to play a sound using Tone.js for a random note
const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]; 

function playCollisionSound() {
  const now = Tone.now();
  const randomNote = random(notes); // Select a random note from the array
  synth.triggerAttackRelease(randomNote, "0.2", now); // Play the random note for 0.2 seconds
}

function mouseClicked() {
  generateParticles(mouseX, mouseY); // Generate new particles on mouse click
}
