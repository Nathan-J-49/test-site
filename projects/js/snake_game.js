var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var scoreDisplay = document.getElementById("score");
var gameDisplay = document.getElementById("display");

var WIDTH = 500;
var HEIGHT = 500;
var SIZE = 10;
canvas.width = WIDTH;
canvas.height = HEIGHT;

var snake = [];
snake.push([25, 25]);
var snakeDx = 0;
var snakeDy = 1;
var growth = 3;
var apple = [];
apple.push(randomInt(1, 50));
apple.push(randomInt(1, 50));
var gameOver = false;
var score = 0;
var pApple = []
pApple.push(randomInt(1, 50));
pApple.push(randomInt(1, 50));


var interval = setInterval(game, 100);

function game() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	for (var i = 0; i < snake.length; i++) {
		var seg = snake[i];
		
		if (i == 0) {
			drawCircle(seg[0], seg[1], "darkorange", 1);
		}
	
		else {
			drawCircle(seg[0], seg[1], "orange", 1);
		}
	}

	drawCircle(apple[0], apple[1], "red", 1);
	
	drawCircle(pApple[0], pApple[1], "purple", 0);
	
	var head = snake[0];
	checkApple(head[0], head[1]);
	checkWall(head[0], head[1]);
	checkSelf(head[0], head[1]);
	checkPoisonApple(head[0], head[1]);
	
	snake.unshift([head[0] + snakeDx, head[1] + snakeDy]);

	while(growth < 0) {
		growth++;
		snake.pop();
		
		if(snake.length == 0) {
			gameOver = true;
			break;
		}
	}
	
	if (growth > 0) {
		console.log(growth);
		growth--;
	} else {
		snake.pop();
	}
	
	if(gameOver == true) {
		clearInterval(interval);
		gameDisplay.innerHTML = "Noooooo, Snake!!!!!";
	}
}

function drawCircle(x, y, color, fill) {
	ctx.beginPath();
	ctx.arc(x * SIZE, y * SIZE, SIZE, 0, 2 * Math.PI);
	if(fill === 1) {
		ctx.fillStyle = color;
		ctx.fill();
	}
	else {
		ctx.strokeStyle = color;
		ctx.stroke();
	}
	ctx.closePath();
}


var UP_KEY = 38;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
window.onkeydown = KeyDown;
function KeyDown(event) {
	if (event.keyCode == UP_KEY) {
		snakeDx = 0;
		snakeDy = -1;
	} else if (event.keyCode == DOWN_KEY) {
		snakeDx = 0;
		snakeDy = 1;
	} else if (event.keyCode == LEFT_KEY) {
		snakeDx = -1;
		snakeDy = 0;
	} else if (event.keyCode == RIGHT_KEY) {
		snakeDx = 1;
		snakeDy = 0;
	}
}


function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


function checkWall(x, y) {
	if (x === 0 || x === (WIDTH / SIZE) || y === 0 || y === (HEIGHT / SIZE)) {
		gameOver = true;
	}
}

function checkSelf(x, y) {
	for (var i = 1; i < snake.length; i++) {
		var seg = snake[i];
		if (x == seg[0] && y == seg[1]) {
			gameOver = true;
			break;
		}
	}
}

function checkApple(x, y) {
	if (x == apple[0] && y == apple[1]) {
		growth += 3;
		score += 3;
		scoreDisplay.innerHTML = "Score: " + score;
		apple[0] = randomInt(1, 50);
		apple[1] = randomInt(1, 50);
	}
}


function checkPoisonApple(x, y) {
	if (x == pApple[0] && y == pApple[1]) {
		growth -= 3;
		score -= 3;
		scoreDisplay.innerHTML = "Score: " + score;
		pApple[0] = randomInt(1, 50);
		pApple[1] = randomInt(1, 50);
	}
}
