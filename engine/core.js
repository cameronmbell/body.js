//Any body consists of a rigidbody and a colliders
//This is temporary
function Body()
{
    //Later different components will be added, but for now they are manually created
    this.transform = new Transform();

    //Privates
    this._components = { }; //A dictionary containing all the components
}

//These functions allows for the manipulation of components
//Body.prototype.SetComponent = function(key, value) { this._components[key.name] = value; }
Body.prototype.GetComponent = function(key) { return this._components[key.name]; }
Body.prototype.AddComponent = function(type) { this._components[type.name] = new type(); }
Body.prototype.RemoveComponent = function(key) { delete this._components[key.name]; }
Body.prototype.TestComponents = function()
{
    //Loop through components and print
    for (var key in this._components)
    {
         if (this._components.hasOwnProperty(key))
         {
             Debug.CreateGroup(key);;
             Debug.RawLog(this._components[key]);
             Debug.EndGroup();
         }
    }
}

//The transform class holds properties about the 3 axis of freedom
function Transform(position=Vector2.zero, scale=Vector2.one, rot=0.0)
{
    //Public properties
    this.position = position; //The position of the object in world space
    this.rotation = rot; //Rotation of the shape in degrees
    this.scale = scale; //The scale vertically and horizontally

    //These are the public functions
    //None yet, but these will later make calculation easier
}
