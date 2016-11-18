//Stores the types of colliders
enum ColliderType
{
    box,    //An AABB collision shape
    circle  //Circle with a radius
};

//The base class for all physics shapes
//There is no constructor for the base class
abstract class Collider
{
    //Properties
    public bodyPointer : Body; //Holds a pointer to the rigidbody (not yet)
    public type : ColliderType; //Holds the ColliderType integer
    public enabled : boolean = true; //Weather this collision shape is active
    public bounds : Vector2 = new Vector2(1, 1); //Holds the volume bounds of the AABB shape
    
    //Not used yet
    //public physicsMaterial = null; //Holds the PhysicsMaterial, with friction properties ect..

    //Evey base needs to implement these functions - pure virtual
    public abstract Clone();
}

//A box collider will inherit from the shape class
//Size and center are both Vector2s
class RectCollider extends Collider
{
    //Call base constructor
    constructor(size : Vector2 = Vector2.one, center : Vector2 = Vector2.zero) { super();  this.size = size; this.center = center; }

    //Public properties
    public size : Vector2;
    public center : Vector2;

    //Base class functions
    public Clone() : RectCollider { return this; } //Wrong for now..
}

//An axis aligned bounding box serves as the base of all collision detection
//This means a box that has its axis alligned with the coordinate system
//It cannot be rotated and is always made of horizontal / vertical lines
//This is known as a bounding box
class AABB
{
    //Construct
    constructor(min : Vector2, max : Vector2) { this.min = min; this.max = max; }

    //Public properties
    public min : Vector2; //This holds the furthest left point on the axis, of the four corners of the rect
    public max : Vector2; //This holds the furthest right point on the axis, of the four corners of the rect

    //Static collision check functions
    public static CheckCollision(a : AABB, b : AABB) : boolean 
    {
        //Later this will use the S A T
        //Project onto the X and Y axis, then check for overlap
        if(a.max.x < b.min.x || a.min.x > b.max.x) { return false; }
        if(a.max.y < b.min.y || a.min.y > b.max.y) { return false; }

        //Success
        return true;        
    }
}

//Circle is sometimes a better bounding than an AABB
class Circle
{
    //Set public values
    constructor(position : Vector2, radius : number) { this.position = position; this.radius = radius; }

    //Public
    public position; //Vector 2 representation of the center
    public radius; //Half extents in all directions

    //Statics
    
    //Checks a collision between two circles
    public static CheckCollision(a : Circle, b : Circle) : boolean
    {
        //Compares the distance vs the radius
        var sqrRadius = Mathf.Pow(Mathf.Abs(a.radius) + Mathf.Abs(b.radius), 2);
        var dist = Vector2.SqrDistance(a.position, b.position);

        //Compare the result
        return sqrRadius < dist;
    }
}