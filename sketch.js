//Balls config

Total_Balls = 10;
Balls = [];
Gravity = .001;
TerminalVelocity = 1;


function setup() {
    createCanvas((windowWidth-25), windowHeight);
    frameRate(60);
    for(let i = 0; i < Total_Balls; i++){
        Balls[i] = {
            Color: {
                R: getRandomInt(100, 255),
                G: getRandomInt(100, 255),
                B: getRandomInt(100, 255)
            },
            Size: getRandomInt(5,15),
            Vec: createVector((windowWidth-25)/2, windowHeight/2),
            XSpeed: getRandomInt(-50,50),
            YSpeed: getRandomInt(-25, 0),
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

        //Apply coefficient of friction, arrest ball at .1 vector speed
        Balls[i].XSpeed = Balls[i].XSpeed * .980;
        if(Math.abs(Balls[i].XSpeed) <= .2){
            Balls[i].XSpeed = 0;
        }

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

        //Detect direction.
        Balls[i].YSpeed = Balls[i].YSpeed + (1/(TerminalVelocity - Math.abs(Balls[i].YSpeed) * Gravity));
        if(Math.abs(Balls[i].YSpeed) < 1 
            && (windowHeight - Balls[i].Size/2) - Balls[i].Vec.y < 8){
            Balls[i].YSpeed = 0;
            Balls[i].Vec.y = windowHeight - (Balls[i].Size/2);
        }


        //Collision with walls
        if(Balls[i].Vec.x <= 0 + Balls[i].Size/2
            || Balls[i].Vec.x >= (windowWidth-25) - Balls[i].Size/2){
            Balls[i].XSpeed = Balls[i].XSpeed * -1;
        }

        if(Balls[i].Vec.y >= windowHeight - Balls[i].Size/2
            || Balls[i].Vec.y <= 0 + Balls[i].Size/2){
            Balls[i].YSpeed = Balls[i].YSpeed * -.50;

            //If the ball sinks too far below the window, and we set the upward motion too low to escape, we end up triggering a second bounce
            //outside the bounds of the screen. For that reason, we need to reset the ball postion to windowHeight on bounce, each time.
            Balls[i].Vec.y = windowHeight - Balls[i].Size/2;
        }

        //End Wall Collision

        fill(Balls[i].Color.R, Balls[i].Color.G, Balls[i].Color.B);
        circle(Balls[i].Vec.x, Balls[i].Vec.y, Balls[i].Size);
        console.log(Balls[i].YSpeed);
    }
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}
