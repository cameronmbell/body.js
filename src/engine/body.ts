/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'LICENSE', which is part of this source code package.

    The specific goal of this file is to:
        - Create a scene graph
        - A base class for a component system
*/

/*All components that can be added to a body inherit from this..
abstract class Component
{
    //None yet..
    public name : string;
    constructor() { }
} 
*/

//Any body consists of a rigidbody and a colliders
//This is temporary
class Body
{
    //Later different components will be added, but for now they are manually created
    public transform : Transform = new Transform();

    //Privates
    private _components : { [ id : string ] : Component } = { }; //A dictionary containing all the components

    //These functions allows for the manipulation of components - static
    //Body.prototype.SetComponent = function(key, value) { this._components[key.name] = value; }
    public GetComponent<comp extends Component>(key : new () => comp) : Component   { return this._components[(<any>new key()).constructor.name]; }
    public AddComponent<comp extends Component>(key : new () => comp) : void        { this._components[(<any>new key()).constructor.name] = new key(); }
    public RemoveComponent<comp extends Component>(key : new () => comp) : void     { delete this._components[(<any>new key()).constructor.name]; }
    
    public TestComponents() : void
    {
        //Loop through components and print
        for (let key in this._components)
        {
            if (this._components.hasOwnProperty(key))
            {
                Debug.CreateGroup(key);
                Debug.RawLog(this._components[key]);
                Debug.EndGroup();
            }
        }
    }
}
