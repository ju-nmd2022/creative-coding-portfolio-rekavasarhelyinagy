let flowers = []; // Array to store the size and color of each flower
let maxSize = 10; // Maximum size for each flower before a new one starts
let centerX, centerY; // Center position for all flowers

function setup() {
  createCanvas(1000, 1000);
  background(255);
  centerX = width / 2; // Set the center position
  centerY = height / 2;
}

function flower(size, color) {
  push();
  translate(centerX, centerY); // Move to the flower's position at the center
  noStroke();
  let petals = 20;

  fill(color.petal); // Use the random petal color
  for (let i = 0; i < petals; i++) {
    ellipse(size, 0, size * 6, size); // Draw ellipse with dynamic size
    rotate(TWO_PI / petals); // Rotate for the next petal
  }

  pop();
}

function draw() {
  background(255); // Clear the background

  // Update and draw each flower
  for (let i = 0; i < flowers.length; i++) {
    let f = flowers[i];
    flower(f.size, f.color); // Draw the flower with its color
    f.size += 0.3; // Increase the size of the flower

    // If the flower reaches maxSize, add a new flower
    if (f.size > maxSize && i === flowers.length - 1) {
      flowers.push({
        size: 0,
        color: {
          petal: color(random(255), random(255), random(255))
        }
      });
    }
  }

  // Add the first flower if the array is empty
  if (flowers.length === 0) {
    flowers.push({
      size: 0,
      color: {
        petal: color(random(255), random(255), random(255))
      }
    });
  }
}



//with the help of ChatGTP