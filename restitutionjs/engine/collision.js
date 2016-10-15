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