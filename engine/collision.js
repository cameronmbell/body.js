//An axis aligned bounding box serves as the base of all collision detection
//This means a box that has its axis alligned with the coordinate system
//It cannot be rotated and is always made of horizontal / vertical lines
//This is known as a bounding box
function AABB(min, max)
{
    //Public properties
    this.min = min; //This holds the furthest left point on the axis, of the four corners of the rect
    this.max = max; //This holds the furthest right point on the axis, of the four corners of the rect
}

//Static function to check collision with other basic shapes - temporary
//Later this will use the S A T
AABB.CheckCollision = function(a, b)
{
    //Project onto the X and Y axis, then check for overlap
    if(a.max.x < b.min.x || a.min.x > b.max.x) { return false; }
    if(a.max.y < b.min.y || a.min.y > b.max.y) { return false; }

    //Success
    return true;
}
