//Canvas Globals
WindowWidth = 1900;
//Fun fact, 800 (in this case) is the BOTTOM of the window.
WindowHeight = 925;

//Balls config

Total_Balls = 1000;
Balls = [];

function setup() {
  createCanvas(WindowWidth, WindowHeight);
  frameRate(60);
  for(let i = 0; i < Total_Balls; i++){
    Balls[i] = {
      Color: {
        R: getRandomInt(100, 255),
        G: getRandomInt(100, 255),
        B: getRandomInt(100, 255)
      },
      Size: getRandomInt(5,15),
      Vec: createVector(WindowWidth/2, WindowHeight/2),
      XSpeed: getRandomInt(-10, 10),
      YSpeed: getRandomInt(-10, 10)
    }
  }
}

function draw() {
  clear();
  for(let i = 0; i < Total_Balls; i++){
    fill(Balls[i].Color.R, Balls[i].Color.G, Balls[i].Color.B);
    circle(Balls[i].Vec.x, Balls[i].Vec.y, Balls[i].Size);
    Balls[i].Vec.x = Balls[i].Vec.x + Balls[i].XSpeed;
    Balls[i].Vec.y = Balls[i].Vec.y + Balls[i].YSpeed;

    //Collision with walls
    if(Balls[i].Vec.x <= 0 + Balls[i].Size/2
    || Balls[i].Vec.x >= WindowWidth - Balls[i].Size/2){
        Balls[i].XSpeed = Balls[i].XSpeed * -1;
    }

    if(Balls[i].Vec.y >= WindowHeight - Balls[i].Size/2
    || Balls[i].Vec.y <= 0 + Balls[i].Size/2){
        Balls[i].YSpeed = Balls[i].YSpeed * -1
    }
    //End Wall Collision
  }
}

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}
