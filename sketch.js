//Canvas Globals
WindowWidth = 1500;
WindowHeight = 800;

TotalBalls = 500;

x = 23;
y = 150;

const ballVec = [];

function setup() {
  createCanvas(WindowWidth,WindowHeight);
  frameRate(60);

  for (let i = 0; i < TotalBalls; i++) {
    ballVec[i] ={
      vec : createVector(getRandomInt(1, WindowWidth), getRandomInt(1, WindowHeight)),
      XOperation : getRandomInt(0,2) == 1 ? "Sub" : "Add",
      YOperation : getRandomInt(0,2) == 1 ? "Sub" : "Add",
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
    circle(ballVec[i].vec.x,ballVec[i].vec.y,8);
  }
  calculateVectors();
}

function calculateVectors(){
  for (let i = 0; i < ballVec.length; i++) {
    
    if(ballVec[i].vec.x >= WindowWidth){
      ballVec[i].XOperation = "Sub";
    }
    if(ballVec[i].vec.x <= 0){
      ballVec[i].XOperation = "Add";
    }
    if(ballVec[i].vec.y >= WindowHeight){
      ballVec[i].YOperation = "Sub";
    }
    if(ballVec[i].vec.y <= 0){
      ballVec[i].YOperation = "Add";
    }
  
    if(ballVec[i].XOperation == "Add" && ballVec[i].YOperation == "Add"){
      ballVec[i].vec.add(ballVec[i].XVecSpeed,ballVec[i].YVecSpeed);
    } else if (ballVec[i].XOperation == "Sub" && ballVec[i].YOperation == "Add"){
      ballVec[i].vec.add(-1 * ballVec[i].XVecSpeed, ballVec[i].YVecSpeed);
    } else if (ballVec[i].XOperation == "Add" && ballVec[i].YOperation == "Sub"){
      ballVec[i].vec.add(ballVec[i].XVecSpeed, -1 * ballVec[i].YVecSpeed);
    } else if (ballVec[i].XOperation == "Sub" && ballVec[i].YOperation == "Sub"){
      ballVec[i].vec.add(-1 * ballVec[i].XVecSpeed, -1 * ballVec[i].YVecSpeed);
    } 
  }
}

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}