//Stores the types of colliders
var ColliderType =
{
    //This will simulate the use of an enum
    box : 0, //An AABB collision shape
    circle: 1 //Circle with a radius
};

//The base class for all physics shapes
//There is no constructor for the base class
function Collider()
{
    //Properties
    this.type = null; //Holds the ColliderType integer
    this.enabled = true; //Weather this collision shape is active
    this.bodyPointer = null; //Holds a pointer to the rigidbody (not yet)
    this.bounds = new Vector2(1, 1); //Holds the volume bounds of the AABB shape
    this.physicsMaterial = null; //Holds the PhysicsMaterial, with friction properties ect..
}

//All the functions should be pure virtual.
Collider.prototype.Clone = function() { Debug.Error("Pure virtual function call!"); return null; }

//A box collider will inherit from the shape class
//Size and center are both Vector2s
function RectCollider(size=Vector2.one, center=Vector2.zero)
{
    //Call base constructor
    RectCollider.super_.call(this)

    //Public properties
    this.size = size;
    this.center = center;
}

//Needs to inherit from Collider
inherits(RectCollider, Collider);

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

//Circle is sometimes a better bounding than an AABB
function Circle(position, radius)
{
    //Public
    this.position = position; //Vector 2 representation of the center
    this.radius = radius; //Half extents in all directions
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

//Checks a collision between two circles
Circle.CheckCollision = function(a, b)
{
    //Compares the distance vs the radius
    var sqrRadius = Mathf.Pow(Mathf.Abs(a.radius) + Mathf.Abs(b.radius), 2);
    var dist = Vector2.SqrDistance(a.position, b.position);

    //Compare the result
    return sqrRadius < dist;
}
