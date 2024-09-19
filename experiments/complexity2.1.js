class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      const a = Math.random() * Math.PI * 2;
      const v = 0.2 + Math.random();
      this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
      this.lifespan = 100 + Math.random() * 100;
      // Assign a random size between 1 and 10
      this.size = random(1, 10);
    }
  
    update() {
      //this.lifespan--;
      this.velocity.mult(0); // Slow down the velocity over time
      this.position.add(this.velocity);
    }
  
    draw() {
      push();
      translate(this.position.x, this.position.y);
      noStroke();
      fill(255, 0, 0, 255); // Red color
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
    //colorMode(HSB);
  }
  
  function generateParticles(x, y) {
    for (let i = 0; i < 50; i++) { // Reduced the number of particles for more space
      // Increase the random spread range to create gaps between particles
      const px = x + random(-50, 50); // Larger range for spreading particles
      const py = y + random(-50, 50);
      const particle = new Particle(px, py);
      particles.push(particle);
    }
  }
  
  let particles = [];
  
  function draw() {
    background(232, 229, 221);
  
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
  

   //Inspired by the artwork of Zach Lieberman: https://www.instagram.com/p/CGQeXoBFekK/
  // with the help of the lecture slides - Particle Systems, and ChatGPT