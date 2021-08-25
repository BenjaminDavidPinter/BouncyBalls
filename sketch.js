//Balls config

Total_Balls = 100;
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
    || Balls[i].Vec.x >= windowWidth - Balls[i].Size/2){
        Balls[i].XSpeed = Balls[i].XSpeed * -1;
    }

    if(Balls[i].Vec.y >= windowHeight - Balls[i].Size/2
    || Balls[i].Vec.y <= 0 + Balls[i].Size/2){
        Balls[i].YSpeed = Balls[i].YSpeed * -1
    }
    //End Wall Collision
  }
}

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}
