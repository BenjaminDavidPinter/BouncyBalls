//Balls config

Total_Balls = 1;
Balls = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	for(let i = 0; i < Total_Balls; i++){
		Balls[i] = {
			Color: {
				R: getRandomInt(100, 255),
				G: getRandomInt(100, 255),
				B: getRandomInt(100, 255)
			},
			Size: getRandomInt(5,15),
			Vec: createVector(windowWidth/2, windowHeight/2),
			XSpeed: getRandomInt(-10, 10),
			YSpeed: getRandomInt(-10, 10),
			PreviousPositions: []
		}
	}
}

function draw() {
	clear();
	for(let i = 0; i < Total_Balls; i++){

		//Move
		let positionLog = {
			previousX : Balls[i].Vec.x,
			previousY : Balls[i].Vec.y
		};
		Balls[i].Vec.x = Balls[i].Vec.x + Balls[i].XSpeed;
		Balls[i].Vec.y = Balls[i].Vec.y + Balls[i].YSpeed;

		positionLog.currentX = Balls[i].Vec.x;
		positionLog.currentY = Balls[i].Vec.y;

		Balls[i].PreviousPositions.push(positionLog);

		for(let j = 0; j < Balls[i].PreviousPositions.length; j++){
			if(Balls[i].PreviousPositions[j].previousY > Balls[i].PreviousPositions[j].currentY){
				stroke(0,255,0);
			} else {
				stroke(255,0,0);
			}
			line(Balls[i].PreviousPositions[j].previousX,
				Balls[i].PreviousPositions[j].previousY,
				Balls[i].PreviousPositions[j].currentX,
				Balls[i].PreviousPositions[j].currentY);
		}

		//Collision with walls
		if(Balls[i].Vec.x <= 0 + Balls[i].Size/2
			|| Balls[i].Vec.x >= windowWidth - Balls[i].Size/2){
			Balls[i].XSpeed = Balls[i].XSpeed * -1;
		}

		if(Balls[i].Vec.y >= windowHeight - Balls[i].Size/2
			|| Balls[i].Vec.y <= 0 + Balls[i].Size/2){
			Balls[i].YSpeed = Balls[i].YSpeed * -1
		}
		//End Wall Collision
		
		fill(Balls[i].Color.R, Balls[i].Color.G, Balls[i].Color.B);
		circle(Balls[i].Vec.x, Balls[i].Vec.y, Balls[i].Size);
	}
}

function getRandomInt(min, max) {
	return Math.random() * (max - min) + min;
}
