/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'LICENSE', which is part of this source code package.

    The specific goal of this file is to:
        - Create a scene graph
        - Create a heirachy structure in the engine
        - Define nodes in the scene graph
        - Define the transform for any body
*/

//Anything in the engine must inherit from this
class Base
{
    //Constructor does nothing
    constructor(name="new") { this.name = name; }

    //Evey thing in the engine needs to have these properties
    public name : string = "";

    //Any object gets a unique instance ID
    public readonly instanceID : number = Base.instanceCounter;
    
    //This static function holds the current instance ID
    private static _instanceCounter : number = 0;
    private static get instanceCounter() { Base._instanceCounter += 1; return Base._instanceCounter; }
    
    //A function for cloning the current object
    public Clone() : Base
    {
        //Get the constructror for the class
        var result = new (<any>this.constructor);

        //Loop though all attributes
        for (var attribute in this) 
        {
            //Replace all properties
            if (typeof(this[attribute]) == 'object') { result[attribute] = this.Clone(); }
            //else { */ result[attribute] = this[attribute]; //}
        }

        //Done
        return result;
    }

    //A function for converting the class into a printable string
    public ToString() : string { return this.name + " : " + (<any>this).constructor.name + " - InstanceID : " + this.instanceID; }
    public Destroy() : void { delete this; }

    //Static functions
    public static Destroy(object : Base) : void { object.Destroy(); }
    public static Instantiate(original : Base) : Base { return original.Clone(); }
}

//This is the base class for any possible node in the scene graph
class SceneNode extends Base
{
    //Private properties
    private _children : SceneNode[] = [ ];

    //Construct and destruct - not supported as of ECMA 6
    constructor() { super(); }

    //Needs to update all children
    public Update() : void
    {
        for(var i = 0; i < this._children.length; i++) { this._children[i].Update(); }
    }

    // --  Functions for interacting with children --

    //This function will remove the node from the scene
    //Serves to delete all children of the current node
    public Destroy() : void
    {
        //Remove all children
        for(var i = 0; i < this._children.length; i++) { this._children[i].Destroy(); }
        this._children = [ ];
    }

    //Will add an element to the children list
    public AddChild(child : SceneNode) : void { this._children.push(child); }
}

//Any component - remeber this is different from a body has these properties
class Component
{
    public foo : number = 4;
}

//The transform class holds properties about the 3 axis of freedom
class Transform
{
    //Public properties
    public position : Vector2; //The position of the object in world space
    public rotation : number; //Rotation of the shape in degrees
    public scale : Vector2; //The scale vertically and horizontally

    //Constructor set properties
    constructor(position=Vector2.zero, scale=Vector2.one, rot=0.0) { this.position = position; this.scale = scale, this.rotation = rot; }
    
    //These are the public functions
    //None yet, but these will later make calculation easier
}