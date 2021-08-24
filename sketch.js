//Canvas Globals
WindowWidth = 1500;
WindowHeight = 800;

TotalBalls = 100;

x = 23;
y = 150;

const ballVec = [];

const obstacles = [
  {
    xPos: getRandomInt(300, 800),
    yPos: getRandomInt(0, 400),
    width: getRandomInt(300, 800),
    height: 40
  },
  {
    xPos: getRandomInt(300, 800),
    yPos: getRandomInt(400, 600),
    width: getRandomInt(300, 800),
    height: 40
  }
];

function setup() {
  createCanvas(WindowWidth, WindowHeight);
  frameRate(60);

  for (let i = 0; i < TotalBalls; i++) {
    ballVec[i] = {
      vec: createVector(getRandomInt(1, WindowWidth), getRandomInt(1, WindowHeight)),
      XOperation: getRandomInt(0, 2) === 0 ? "Rise" : "Fall",
      YOperation: getRandomInt(0, 2) === 0 ? "Rise" : "Fall",
      XVecSpeed: getRandomInt(1, 8),
      YVecSpeed: getRandomInt(1, 8),
      Color: color(getRandomInt(0, 256), getRandomInt(0, 256), getRandomInt(0, 256)),
      BallSize: getRandomInt(5, 15)
    }
  }
}

function draw() {
  background(220);
  createObstacles();
  for (let i = 0; i < ballVec.length; i++) {
    fill(ballVec[i].Color);
    noStroke();
    circle(ballVec[i].vec.x, ballVec[i].vec.y, ballVec[i].BallSize);
  }
  calculateVectors();
}

function createObstacles() {
  fill(100, 100, 100);
  for (let i = 0; i < obstacles.length; i++) {
    rect(obstacles[i].xPos,
      obstacles[i].yPos,
      obstacles[i].width,
      obstacles[i].height);
  }
}

function calculateVectors() {
  for (let i = 0; i < ballVec.length; i++) {
    ballVec[i] = applyStandardMovement(ballVec[i]);
  }
}

function applyStandardMovement(ballvec) {


  if (ballvec.vec.x >= WindowWidth - ballvec.BallSize) {
    ballvec.XOperation = "Rise";
  }
  if (ballvec.vec.x <= 0 + ballvec.BallSize) {
    ballvec.XOperation = "Fall";
  }
  if (ballvec.vec.y >= WindowHeight - ballvec.BallSize) {
    ballvec.YOperation = "Rise";
    if (ballvec.YVecSpeed <= 0) {
      ballvec.YVecSpeed = ballvec.YVecSpeed * -1;
    }
  }
  if (ballvec.vec.y <= 0) {
    ballvec.YOperation = "Fall";
  }

  for (let i = 0; i < obstacles.length; i++) {
    if(ballvec.vec.y >= obstacles[i].yPos - (ballvec.BallSize/2)
      && ballvec.vec.y <= obstacles[i].yPos + (ballvec.BallSize/2) 
      && (ballvec.vec.x >= obstacles[i].xPos - (ballvec.BallSize/2)
      && ballvec.vec.x <= obstacles[i].xPos + obstacles[i].width)){
        ballvec.YOperation = ballvec.YOperation = "Rise";
        if (ballvec.YVecSpeed <= 0) {
          ballvec.YVecSpeed = ballvec.YVecSpeed * -1;
        }
        if(ballvec.YVecSpeed < .5){
          ballvec.vec.y = obstacles[i].yPos - (ballvec.BallSize/2);
        }
    }
  }

  //If the y value is growing, resist the growth.
  //If the y value is shrinking, multiply the growth.

  ballvec.XVecSpeed = ballvec.XVecSpeed - .001;
  if (ballvec.XVecSpeed <= 0) {
    ballvec.XVecSpeed = 0;
  }

  if (ballvec.XOperation == "Fall" && ballvec.YOperation == "Fall") {
    ballvec.YVecSpeed = ballvec.YVecSpeed + .2;
    ballvec.vec.add(ballvec.XVecSpeed, ballvec.YVecSpeed);
  } else if (ballvec.XOperation == "Rise" && ballvec.YOperation == "Fall") {
    ballvec.YVecSpeed = ballvec.YVecSpeed + .2;
    ballvec.vec.add(-1 * ballvec.XVecSpeed, ballvec.YVecSpeed);
  } else if (ballvec.XOperation == "Fall" && ballvec.YOperation == "Rise") {
    ballvec.YVecSpeed = ballvec.YVecSpeed - 1;
    ballvec.vec.add(ballvec.XVecSpeed, -1 * ballvec.YVecSpeed);
  } else if (ballvec.XOperation == "Rise" && ballvec.YOperation == "Rise") {
    ballvec.YVecSpeed = ballvec.YVecSpeed - 1;
    ballvec.vec.add(-1 * ballvec.XVecSpeed, -1 * ballvec.YVecSpeed);
  }

  //TODO: This needs to be better.

  if (ballvec.vec.y > WindowHeight - ballvec.BallSize) {
    ballvec.vec.y = WindowHeight - ballvec.BallSize;
  }

  return ballvec;
}

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}
