class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      const a = Math.random() * Math.PI * 2;
      const v = 0.2 + Math.random();
      this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
      this.lifespan = 100 + Math.random() * 100;
      this.size = random(1, 10); // Random size between 1 and 10
      // Assign a random color
      this.color = color(random(255), random(255), random(255), 255); // Random color with full opacity
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
      ellipse(0, 0, this.size); // Use the random size for each ellipse
      pop();
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
  function setup() {
    createCanvas(innerWidth, innerHeight);
    blendMode(BLEND);
  }
  
  function generateParticles(x, y) {
    for (let i = 0; i < 50; i++) { // Reduced the number of particles for more space
      const px = x + random(-50, 50); // Larger range for spreading particles
      const py = y + random(-50, 50);
      const particle = new Particle(px, py);
      particles.push(particle);
    }
  }
  
  let particles = [];
  
  function draw() {
    background(0, 0, 0);
  
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
  