//This is a demo that shows the collision checking functions

//The different shapes that will be used
var mainBox = null;
var staticBox = null;

//Create the objects
function setup()
{
    //Init
    createCanvas(640, 480);
    noStroke();

    //Create
    staticBox = new AABB(new Vector2(100, 100), new Vector2(150, 150));
    mainBox = new AABB(new Vector2(0, 0), new Vector2(50, 50));
}

//Update
function draw()
{
    //Reset
    clear();

    //Move the box
    mainBox.min = new Vector2(mouseX,      mouseY);
    mainBox.max = new Vector2(mouseX + 50, mouseY + 50);

    //Draw collision check
    if(AABB.CheckCollision(mainBox, staticBox)) fill(255, 100, 100);
    else                                        fill(100, 100, 255);

    //Draw
    rect(staticBox.min.x, staticBox.min.y, 50, 50);
    rect(mainBox.min.x, mainBox.min.y, 50, 50);
}
