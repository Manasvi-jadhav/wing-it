const bird = document.getElementById("bird");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let birdTop = 200;
let gravity = 0.002;
let jump = -0.2;
let velocity = 0.002;
let score = 0;
let isGameOver = false;

// Start gravity effect
function fall() {
  velocity += gravity;
  birdTop += velocity;
  bird.style.top = birdTop + "px";

  if (birdTop > 570 || birdTop < 0) {
    endGame();
  }
}

// Bird flap on space
document.addEventListener("keydown", (e) => {
  if (!isGameOver) {
    if (e.code === "ArrowUp") {
      velocity = -jump; // go up
    } else if (e.code === "ArrowDown") {
      velocity = jump; // go down faster
    }
  }
});



// Create pipes
function createPipes() {
  const gap = 150;
  const pipeTopHeight = Math.floor(Math.random() * 200) + 50;
  const pipeBottomHeight = 600 - pipeTopHeight - gap;

  const pipeTop = document.createElement("div");
  pipeTop.classList.add("pipe", "pipe-top");
  pipeTop.style.height = pipeTopHeight + "px";
  pipeTop.style.left = "400px";

  const pipeBottom = document.createElement("div");
  pipeBottom.classList.add("pipe", "pipe-bottom");
  pipeBottom.style.height = pipeBottomHeight + "px";
  pipeBottom.style.left = "400px";

  game.appendChild(pipeTop);
  game.appendChild(pipeBottom);

  let pipeLeft = 400;
  const movePipe = setInterval(() => {
    if (isGameOver) {
      clearInterval(movePipe);
      return;
    }

    pipeLeft -= 2;
    pipeTop.style.left = pipeLeft + "px";
    pipeBottom.style.left = pipeLeft + "px";

    // Remove pipes if off-screen
    if (pipeLeft < -60) {
      clearInterval(movePipe);
      game.removeChild(pipeTop);
      game.removeChild(pipeBottom);
      score++;
      scoreDisplay.innerText = "Score: " + score;
    }

    // Collision detection
    if (
      pipeLeft < 80 &&
      pipeLeft > 20 &&
      (birdTop < pipeTopHeight || birdTop > pipeTopHeight + gap)
    ) {
      endGame();
    }
  }, 20);
}

// Game loop
let gravityLoop = setInterval(() => {
  if (!isGameOver) fall();
}, 20);

// Pipe loop
let pipeLoop = setInterval(() => {
  if (!isGameOver) createPipes();
}, 2000);

// Game over
function endGame() {
  isGameOver = true;
  alert("Game Over! Final Score: " + score);
  location.reload();
}






