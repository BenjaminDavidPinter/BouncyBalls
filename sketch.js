//Canvas Globals
WindowWidth = 1500;
WindowHeight = 800;

TotalBalls = 250;
BallSize = 15;

x = 23;
y = 150;

const ballVec = [];

function setup() {
  createCanvas(WindowWidth,WindowHeight);
  frameRate(60);

  for (let i = 0; i < TotalBalls; i++) {
    ballVec[i] ={
      vec : createVector(getRandomInt(1, WindowWidth), getRandomInt(1, WindowHeight)),
      XOperation : getRandomInt(0,2) === 0 ? "Rise" : "Fall",
      YOperation : getRandomInt(0,2) === 0 ? "Rise" : "Fall",
      XVecSpeed : getRandomInt(1,8),
      YVecSpeed : getRandomInt(1,8),
      Color: color(getRandomInt(0,256), getRandomInt(0,256), getRandomInt(0,256))
    } 
  }
}

function draw() {
  background(220);
  for (let i = 0; i < ballVec.length; i++) {
    fill(ballVec[i].Color);
    noStroke();
    circle(ballVec[i].vec.x,ballVec[i].vec.y,BallSize);
    console.log(ballVec[i].vec.y);
  }
  calculateVectors();
}

function calculateVectors(){
  for (let i = 0; i < ballVec.length; i++) {
    ballVec[i] = applyStandardMovement(ballVec[i]); 
  }
}

function applyGravity(vector){
  
}

function applyStandardMovement(ballvec){

  if(ballvec.vec.x >= WindowWidth-BallSize){
    ballvec.XOperation = "Rise";
  }
  if(ballvec.vec.x <= 0 + BallSize){
    ballvec.XOperation = "Fall";
  }
  if(ballvec.vec.y >= WindowHeight - BallSize){
    ballvec.YOperation = "Rise";
    console.log("I'm Rising!");
    if(ballvec.YVecSpeed <= 0){
      ballvec.YVecSpeed = ballvec.YVecSpeed * -1; 
    } 
  }
  if(ballvec.vec.y <= 0){
    ballvec.YOperation = "Fall";
    console.log("I'm Falling!");
  }

  //If the y value is growing, resist the growth.
  //If the y value is shrinking, multiply the growth.

  ballvec.XVecSpeed = ballvec.XVecSpeed - .008;
  if(ballvec.XVecSpeed <=  0){
    ballvec.XVecSpeed = 0;
  }

  if(ballvec.XOperation == "Fall" && ballvec.YOperation == "Fall"){
    ballvec.YVecSpeed = ballvec.YVecSpeed + .1;
    ballvec.vec.add(ballvec.XVecSpeed,ballvec.YVecSpeed);
  } else if (ballvec.XOperation == "Rise" && ballvec.YOperation == "Fall"){
    ballvec.YVecSpeed = ballvec.YVecSpeed + .1;
    ballvec.vec.add(-1 * ballvec.XVecSpeed, ballvec.YVecSpeed);
  } else if (ballvec.XOperation == "Fall" && ballvec.YOperation == "Rise"){
    ballvec.YVecSpeed = ballvec.YVecSpeed - .7;
    ballvec.vec.add(ballvec.XVecSpeed, -1 * ballvec.YVecSpeed);
  } else if (ballvec.XOperation == "Rise" && ballvec.YOperation == "Rise"){
    ballvec.YVecSpeed = ballvec.YVecSpeed - .7;
    ballvec.vec.add(-1 * ballvec.XVecSpeed, -1 * ballvec.YVecSpeed);
  }

  if(ballvec.vec.y >= WindowHeight - BallSize){
    ballvec.vec.y = WindowHeight +- BallSize;
  }

  return ballvec;
}

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}
