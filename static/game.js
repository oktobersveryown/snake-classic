const gameState = {
    snake: [],
    food: {},
    direction: 'right',
    score: 0,
    gameOver: false,
    gameInterval: null,
    speed: INITIAL_SPEED,
    fruitsEaten: 0,
    paused: false,
};

function startGame() {
    showGame();
    resetGame();
    gameState.gameInterval = setInterval(update, gameState.speed);
}

function resetGame() {
    gameState.snake = [{ x: 10, y: 10 }];
    gameState.food = {};
    gameState.direction = 'right';
    gameState.score = 0;
    gameState.gameOver = false;
    gameState.paused = false;
    gameState.speed = INITIAL_SPEED;
    gameState.fruitsEaten = 0;
    generateFood();
}

function generateFood() {
    const canvas = document.getElementById('gameCanvas');
    gameState.food = {
        x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)),
        y: Math.floor(Math.random() * (canvas.height / GRID_SIZE))
    };
    // Ensure food doesn't spawn on the snake
    for (let i = 0; i < gameState.snake.length; i++) {
        if (gameState.food.x === gameState.snake[i].x && gameState.food.y === gameState.snake[i].y) {
            generateFood();
            return;
        }
    }
}

function update() {
    if (gameState.gameOver || gameState.paused) {
        return;
    }

    const head = { x: gameState.snake[0].x, y: gameState.snake[0].y };

    switch (gameState.direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    if (isCollision(head)) {
        endGame();
        return;
    }

    gameState.snake.unshift(head);

    if (head.x === gameState.food.x && head.y === gameState.food.y) {
        gameState.score++;
        gameState.fruitsEaten++;
        if (gameState.fruitsEaten % SPEED_RAMP_THRESHOLD === 0) {
            gameState.speed = Math.max(50, gameState.speed + SPEED_INCREMENT);
            clearInterval(gameState.gameInterval);
            gameState.gameInterval = setInterval(update, gameState.speed);
        }
        generateFood();
    } else {
        gameState.snake.pop();
    }

    draw(gameState.snake, gameState.food, gameState.score);
}

function isCollision(head) {
    const canvas = document.getElementById('gameCanvas');
    // Wall collision
    if (head.x < 0 || head.x >= canvas.width / GRID_SIZE || head.y < 0 || head.y >= canvas.height / GRID_SIZE) {
        return true;
    }
    // Self collision
    for (let i = 1; i < gameState.snake.length; i++) {
        if (head.x === gameState.snake[i].x && head.y === gameState.snake[i].y) {
            return true;
        }
    }
    return false;
}

function endGame() {
    gameState.gameOver = true;
    clearInterval(gameState.gameInterval);
    drawGameOver(gameState.score);

    setTimeout(() => {
        const playerName = prompt('Your score: ' + gameState.score + '\nEnter your name for the leaderboard:');
        if (playerName && playerName.trim()) {
            saveHighScore(gameState.score, playerName.trim());
        }
        showMenu();
    }, 500);
}

function togglePause() {
    gameState.paused = !gameState.paused;
    const pauseMenu = document.getElementById('pause-menu');
    if (gameState.paused) {
        clearInterval(gameState.gameInterval);
        pauseMenu.style.display = 'flex';
    } else {
        gameState.gameInterval = setInterval(update, gameState.speed);
        pauseMenu.style.display = 'none';
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (!gameState.gameOver) {
            togglePause();
        }
        return;
    }

    if (!gameState.gameOver && !gameState.paused) {
        switch (e.key) {
            case 'ArrowUp':
                if (gameState.direction !== 'down') gameState.direction = 'up';
                break;
            case 'ArrowDown':
                if (gameState.direction !== 'up') gameState.direction = 'down';
                break;
            case 'ArrowLeft':
                if (gameState.direction !== 'right') gameState.direction = 'left';
                break;
            case 'ArrowRight':
                if (gameState.direction !== 'left') gameState.direction = 'right';
                break;
        }
    }
});

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('highscoresButton').addEventListener('click', displayHighscores);
document.getElementById('backButton').addEventListener('click', showMenu);
document.getElementById('resumeButton').addEventListener('click', togglePause);
document.getElementById('restartButton').addEventListener('click', () => {
    document.getElementById('pause-menu').style.display = 'none';
    startGame();
});
document.getElementById('quitButton').addEventListener('click', () => {
    document.getElementById('pause-menu').style.display = 'none';
    showMenu();
});


// Initial setup
showMenu();
