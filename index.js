const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const snakeSize = 20;
const gridSize = 20;

let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = "right";
let score = 0;
let gameInterval;

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, snakeSize, snakeSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, snakeSize, snakeSize);
}

function changeDirection(event) {
    const key = event.keyCode;
    switch (key) {
        case 37:
            if (direction !== "right") direction = "left";
            break;
        case 38:
            if (direction !== "down") direction = "up";
            break;
        case 39:
            if (direction !== "left") direction = "right";
            break;
        case 40:
            if (direction !== "up") direction = "down";
            break;
    }
}

function checkCollision() {
    const head = snake[0];
    if (
        head.x < 0 ||
        head.x >= canvas.width / gridSize ||
        head.y < 0 ||
        head.y >= canvas.height / gridSize
    ) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function update() {
    const head = { ...snake[0] };
    switch (direction) {
        case "left":
            head.x -= 1;
            break;
        case "up":
            head.y -= 1;
            break;
        case "right":
            head.x += 1;
            break;
        case "down":
            head.y += 1;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food.x = Math.floor(Math.random() * (canvas.width / gridSize));
        food.y = Math.floor(Math.random() * (canvas.height / gridSize));
        updateScore();
    } else {
        snake.pop();
    }

    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over! Score: " + score);
        snake = [{ x: 5, y: 5 }];
        direction = "right";
        score = 0;
        updateScore();
        gameInterval = setInterval(update, 150);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
}

document.addEventListener("keydown", changeDirection);
updateScore();
gameInterval = setInterval(update, 150); 