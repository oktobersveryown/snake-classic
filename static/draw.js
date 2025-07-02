function draw(snake, foods, score, level) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wall with alternating brick pattern
    const lightBrick = '#A0522D'; // Sienna
    const darkBrick = '#8B4513'; // SaddleBrown
    for (let x = 0; x < canvas.width / GRID_SIZE; x++) {
        for (let y = 0; y < canvas.height / GRID_SIZE; y++) {
            if (x < WALL_THICKNESS || x >= canvas.width / GRID_SIZE - WALL_THICKNESS ||
                y < WALL_THICKNESS || y >= canvas.height / GRID_SIZE - WALL_THICKNESS) {
                
                // Create a checkerboard pattern
                if ((x + y) % 2 === 0) {
                    ctx.fillStyle = lightBrick;
                } else {
                    ctx.fillStyle = darkBrick;
                }
                
                ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
                // Add a darker stroke for mortar
                ctx.strokeStyle = '#5A2D0C';
                ctx.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            }
        }
    }

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#2ecc71' : '#27ae60'; // Brighter green
        ctx.fillRect(snake[i].x * GRID_SIZE, snake[i].y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        ctx.strokeStyle = '#2c3e50'; // Grid lines
        ctx.strokeRect(snake[i].x * GRID_SIZE, snake[i].y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }

    // Draw foods
    for (const food of foods) {
        ctx.fillStyle = food.type.color;
        ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }

    // Draw score
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Draw "Score: " text
    ctx.font = '20px Arial';
    const scoreText = 'Score: ';
    const scoreTextWidth = ctx.measureText(scoreText).width;
    
    // Draw score number
    ctx.font = '28px Arial';
    const scoreNumWidth = ctx.measureText(score).width;
    
    const totalWidth = scoreTextWidth + scoreNumWidth;
    const startX = (canvas.width - totalWidth) / 2;

    ctx.font = '20px Arial';
    ctx.fillText(scoreText, startX + scoreTextWidth / 2, 10);
    
    ctx.font = '28px Arial';
    ctx.fillText(score, startX + scoreTextWidth + scoreNumWidth / 2, 6);

    // Draw level
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';

    // Draw "Level: " text
    ctx.font = '20px Arial';
    const levelText = 'Level: ';
    const levelTextWidth = ctx.measureText(levelText).width;

    // Draw level number
    ctx.font = '28px Arial';
    const levelNumWidth = ctx.measureText(level).width;

    const totalLevelWidth = levelTextWidth + levelNumWidth;
    const levelStartX = canvas.width - totalLevelWidth - 10;

    ctx.font = '20px Arial';
    ctx.fillText(levelText, levelStartX + levelTextWidth / 2, 10);

    ctx.font = '28px Arial';
    ctx.fillText(level, levelStartX + levelTextWidth + levelNumWidth / 2, 6);
}

function drawGameOver(score) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = '30px Arial';
    ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 10);
}
