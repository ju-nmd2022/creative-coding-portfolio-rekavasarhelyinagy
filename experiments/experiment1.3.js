let flowers = []; // Array to store the size, color, and rotation of each flower
let maxSize = 20; // Maximum size for each flower before a new one starts
let centerX, centerY; // Center position for all flowers

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  centerX = width / 2; // Set the center position
  centerY = height / 2;
}

function flower(size, color, angle) {
  push();
  translate(centerX, centerY); // Move to the flower's position at the center
  rotate(angle); // Apply rotation

  noStroke();
  let petals = 10;

  fill(color.petal); // Use the random petal color
  for (let i = 0; i < petals; i++) {
    ellipse(size, 0, size * 3, size); // Draw ellipse with dynamic size
    rotate(TWO_PI / petals); // Rotate for the next petal
  }

  pop();
}

function draw() {
  background(0); // Clear the background

  // Update and draw each flower
  for (let i = 0; i < flowers.length; i++) {
    let f = flowers[i];
    flower(f.size, f.color, f.angle); // Draw the flower with its color and rotation
    f.size += 0.5; // Increase the size of the flower
    f.angle += 0.01; // Gradually increase the rotation angle

    // If the flower reaches maxSize, add a new flower
    if (f.size > maxSize && i === flowers.length - 1) {
      flowers.push({
        size: 0,
        color: {
          petal: color(random(255), random(255), random(255), 100) // Lower opacity (100 out of 255)
        },
        angle: 0 // Initialize angle for new flower
      });
    }
  }

  // Add the first flower if the array is empty
  if (flowers.length === 0) {
    flowers.push({
      size: 0,
      color: {
        petal: color(random(255), random(255), random(255), 100) // Lower opacity (100 out of 255)
      },
      angle: 0 // Initialize angle for the first flower
    });
  }
}


//with the help of ChatGTP