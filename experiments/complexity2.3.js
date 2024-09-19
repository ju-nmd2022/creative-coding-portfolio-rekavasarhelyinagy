class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      const a = Math.random() * Math.PI * 2;
      const v = 0.2 + Math.random();
      this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
      this.lifespan = 100 + Math.random() * 100;
      this.size = random(5, 20); // Random size between 5 and 20
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
      fill(255, 255, 0, 255); 
        drawStar(0, 0, this.size / 2, this.size / 8, 5); 
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
  