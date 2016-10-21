//This is a demo that shows the collision checking functions

//The different shapes that will be used
var mainCircle = null;
var staticCircle = null;

//Create the objects
function setup()
{
    //Init
    createCanvas(640, 480);
    ellipseMode(CENTER);
    noStroke();

    //Create
    staticCircle = new Circle(new Vector2(100, 100), 20);
    mainCircle = new Circle(new Vector2(0, 0), 50);
}

//Timer
var time = 0;

//Update
function draw()
{
    //Reset
    clear();
    background(230);

    //Move the box
    mainCircle.position = new Vector2(mouseX, mouseY);

    //Draw collision check
    if(Circle.CheckCollision(mainCircle, staticCircle)) fill(255, 100, 100);
    else                                                fill(100, 100, 255);

    //Draw
    ellipse(staticCircle.position.x, staticCircle.position.y, staticCircle.radius * 2);
    ellipse(mainCircle.position.x, mainCircle.position.y, mainCircle.radius * 2);

    //Do some random garbage
    staticCircle.position.x = Mathf.Bounce(time * 2, staticCircle.radius, width - staticCircle.radius);
    staticCircle.position.y = Mathf.Bounce(time * 2, staticCircle.radius, height - staticCircle.radius);

    time += 1;
}
