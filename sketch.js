//Balls config

Total_Balls = 1;
Total_Obstacles = 1;
Balls = [];
Obstacles =[];
Gravity = .001;
TerminalVelocity = 1;

//Debug mode
Debug_Mode = true;



function setup() {
	createCanvas((windowWidth-25), windowHeight);
	frameRate(60);
	initBalls();
	initObstacles();	
	textSize(12);
  	textAlign(CENTER, CENTER);
}

function draw() {
	if(!Debug_Mode){
		clear();
	}
	drawObstacles();
	

	//Balls Stuff
	for(let i = 0; i < Total_Balls; i++){
		moveBall(Balls[i]);
		collideWithWalls(Balls[i]);

		let positionHistoryRecord = Balls[i].PreviousPositions[Balls[i].PreviousPositions.length -1];


		for(let j = 0; j < Total_Obstacles; j++){
			if(checkCollide(Obstacles[j], Balls[i])){
				if(checkBallYDirection(positionHistoryRecord) === "down"){
					//Never let the ball bounce from within the obstacle.
					Balls[i].Vec.y = Obstacles[j].Y - Balls[i].Size/2;
						
					//If we're already pretty slow, just halt.
					if(Balls[i].YSpeed < 3.5 && (Obstacles[j].Y - Balls[i].Size/2) - Balls[i].Vec.y < 10){
						Balls[i].YSpeed = 0;
						Balls[i].Vec.y = Obstacles[j].Y - Balls[i].Size/2;
					}
				} else {
					Balls[i].Vec.y = Obstacles[j].Y + Obstacles[j].Height + Balls[i].Size/2;
				}
				Balls[i].YSpeed = Balls[i].YSpeed * -.50;
			}
		}
		
		//Halt on the floor if our speed is low
		if(Math.abs(Balls[i].YSpeed) < 1 
			&& (windowHeight - Balls[i].Size/2) - Balls[i].Vec.y < 8){
			Balls[i].YSpeed = 0;
			Balls[i].Vec.y = windowHeight - (Balls[i].Size/2);
		}

		drawBall(Balls[i]);
		if(Debug_Mode){
			drawDebugLines(Balls[i].PreviousPositions);
			drawDebugText(Balls[i]);
		}
	}
}

function getRandomInt(min, max) {
	return Math.random() * (max - min) + min;
}

function drawDebugLines(positionHistory){
	for(let j = 0; j < positionHistory.length; j++){
		line(positionHistory[j].previousX,
			positionHistory[j].previousY,
			positionHistory[j].currentX,
			positionHistory[j].currentY);
	}
}

function initBalls(){
	for(let i = 0; i < Total_Balls; i++){
		Balls[i] = {
			Color: {
				R: getRandomInt(100, 255),
				G: getRandomInt(100, 255),
				B: getRandomInt(100, 255)
			},
			Size: getRandomInt(15,20),
			Vec: createVector(windowWidth/2, 150),
			XSpeed: getRandomInt(-20,20),
			YSpeed: getRandomInt(-15, 0),
			PreviousPositions: []
		}
	}
}

function initObstacles(){
	for(let i = 0; i < Total_Obstacles; i++){
		Obstacles[i] = {
			X: windowWidth /4,
			Y: getRandomInt(windowHeight/2, windowHeight/1.2),
			Width : 700,
			Height : 30
		}
	}
}

function drawObstacles(){
	for(let i = 0; i < Total_Obstacles; i++){
		fill(200,200,200);
		rect(Obstacles[i].X, Obstacles[i].Y, Obstacles[i].Width, Obstacles[i].Height);
	}
}

function drawBall(ball){
	fill(ball.Color.R, ball.Color.G, ball.Color.B);
	circle(ball.Vec.x, ball.Vec.y, ball.Size);
}

function moveBall(ball){
	let positionHistoryRecord = {
		previousX : ball.Vec.x,
		previousY : ball.Vec.y,
		currentX : null,
		currentY : null
	};
	
	moveBallInternal(ball);

	positionHistoryRecord.currentX = ball.Vec.x;
	positionHistoryRecord.currentY = ball.Vec.y;
	ball.PreviousPositions.push(positionHistoryRecord);
	
	ball.YSpeed = ball.YSpeed + (1/(TerminalVelocity - Math.abs(ball.YSpeed) * Gravity));
}

function moveBallInternal(ball){
	ball.Vec.x = ball.Vec.x + ball.XSpeed;
	ball.Vec.y = ball.Vec.y + ball.YSpeed;

	applyFriction(ball, .980);
}

function applyFriction(ball, coefficient){
	ball.XSpeed = ball.XSpeed * coefficient;
	if(Math.abs(ball.XSpeed) <= .2){
		ball.XSpeed = 0;
	}
}

function collideWithWalls(ball){
	if(ball.Vec.x <= 0 + ball.Size/2
		|| ball.Vec.x >= (windowWidth-25) - ball.Size/2){
			ball.XSpeed = ball.XSpeed * -1;
	}

	if(ball.Vec.y >= windowHeight - ball.Size/2
		|| ball.Vec.y <= 0 + ball.Size/2){
			ball.YSpeed = ball.YSpeed * -.50;
		//If the ball sinks too far below the window, and we set the upward motion too low to escape, we end up triggering a second bounce
		//outside the bounds of the screen. For that reason, we need to reset the ball postion to windowHeight on bounce, each time.
		ball.Vec.y = windowHeight - ball.Size/2;
	}
}

function checkCollide(obstacle, ball){
	return ball.Vec.x > obstacle.X
				&& ball.Vec.x < obstacle.X + obstacle.Width
				&& ball.Vec.y > obstacle.Y - ball.Size/2
				&& ball.Vec.y < obstacle.Y + obstacle.Height + ball.Size/2;
}

function checkBallYDirection(positionHistoryRecord){
	if(positionHistoryRecord.previousY < positionHistoryRecord.currentY){
		return 'down';
	} else {
		return 'up';
	}
}

function drawDebugText(ball){
	text("X:"+truncateDecimals(ball.XSpeed, 0)+" Y:"+truncateDecimals(ball.YSpeed, 0), ball.Vec.x + 50, ball.Vec.y + 4);
}

function truncateDecimals (num, digits) {
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    return parseFloat(finalResult);
}