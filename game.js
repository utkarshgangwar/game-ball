// Game elements
const ball = document.getElementById("ball");
const obstacle = document.getElementById("obstacle");
const scoreEl = document.getElementById("score");
const gameContainer = document.getElementById("game");

let isJumping = false;
let score = 0;
let isGameOver = false;

// Ground level for the ballsaur
const groundLevel = 5;

// Make the ballsaur jump
function jump() {
    if (isJumping) return;

    isJumping = true;
    let jumpHeight = groundLevel;

    // Speed up the jump and fall intervals to make it smoother
    const jumpSpeed = 12;  // Controls the jump height
    const fallSpeed = 12;  // Controls the fall speed

    // Jumping up
    const upInterval = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(upInterval);

            // Start falling
            const downInterval = setInterval(() => {
                if (jumpHeight <= groundLevel) {
                    clearInterval(downInterval);
                    isJumping = false; // Reset jumping state
                    jumpHeight = groundLevel; // Ensure the ball stops at ground level
                    ball.style.bottom = `${groundLevel}px`;
                } else {
                    jumpHeight -= fallSpeed; // Fall faster
                    ball.style.bottom = `${jumpHeight}px`;
                }
            }, 20);
        } else {
            jumpHeight += jumpSpeed; // Jump faster
            ball.style.bottom = `${jumpHeight}px`;
        }
    }, 20);
}

// Move the obstacle
function moveCactus() {
    if (isGameOver) return;

    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft <= -20) {
        // Reset obstacle position and increase score
        obstacle.style.left = `${gameContainer.offsetWidth}px`;
        score++;
        scoreEl.textContent = `Score: ${score}`;
    } else {
        obstacle.style.left = `${obstacleLeft - 5}px`;
    }

    // Collision detection
    const ballBottom = parseInt(window.getComputedStyle(ball).getPropertyValue("bottom"));

    if (
        obstacleLeft <= 100 &&
        obstacleLeft >= 50 &&
        ballBottom <= groundLevel + obstacle.offsetHeight
    ) {
        isGameOver = true;
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }

    if (!isGameOver) {
        requestAnimationFrame(moveCactus);
    }
}

// Listen for jump
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
        jump();
    }
});

// Start the game
obstacle.style.left = `${gameContainer.offsetWidth}px`;
moveCactus();
