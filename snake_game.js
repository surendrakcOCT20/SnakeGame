// Create and append the canvas element dynamically
const canvas = document.createElement('canvas');
canvas.id = 'gameCanvas';
canvas.width = 400;
canvas.height = 400;
canvas.style.backgroundColor = '#000';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20; // Size of each grid cell
let snake = [{ x: 200, y: 200 }]; // Snake starts as one segment
let direction = 'RIGHT'; // Initial direction
let food = { x: 100, y: 100 }; // Initial food position
let score = 0;

// Draw the snake
function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Move the snake
function moveSnake() {
  const head = { ...snake[0] }; // Copy the head of the snake

  // Update the head's position based on the direction
  if (direction === 'UP') head.y -= gridSize;
  if (direction === 'DOWN') head.y += gridSize;
  if (direction === 'LEFT') head.x -= gridSize;
  if (direction === 'RIGHT') head.x += gridSize;

  // Add the new head to the snake
  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    // Remove the tail if no food is eaten
    snake.pop();
  }
}

// Generate food at a random position
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

// Check for collisions
function checkCollision() {
  const head = snake[0];

  // Check if the snake hits the walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }

  // Check if the snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Game loop
function gameLoop() {
  if (checkCollision()) {
    alert(`Game Over! Your score: ${score}`);
    clearInterval(gameInterval);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  moveSnake();
  drawSnake();
  drawFood();

  // Draw the score
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Start the game loop
const gameInterval = setInterval(gameLoop, 100);