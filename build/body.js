var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'LICENSE', which is part of this source code package.

    The specific goal of this file is to:
        - Wrap around JS console functions
        - Easier colour managment in the console
*/
//Wrapper (static) class for now that wraps around the built in console operations
var Debug;
(function (Debug) {
    //Properties when logging
    Debug.backgroundColour = 'white';
    //Holds the current debug string
    function GenerateDebugFormatting() {
        //Create CSS Style info for the text
        return 'color: ' + Debug.textColour + ';' +
            'font-size: ' + Debug.fontSize + ';' +
            'background: ' + Debug.backgroundColour + ';';
    }
    Debug.GenerateDebugFormatting = GenerateDebugFormatting;
    ;
    //Will reset the formatting properties
    function ResetFormatting() {
        //Revert back to defualt values
        Debug.backgroundColour = 'white';
        Debug.textColour = 'black';
        Debug.fontSize = 'normal';
    }
    Debug.ResetFormatting = ResetFormatting;
    ;
    //Wrappers that add some functionality
    function RawLog(data) { console.log(data); }
    Debug.RawLog = RawLog;
    ; //Will print the param with console log directly, this is good for pritinf objects
    function Log(text) { console.log('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Log = Log;
    ; //Prints using the current debug formatting
    function Warning(text) { console.warn('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Warning = Warning;
    ; //Prints using the current debug formatting in warning format
    function Error(text) { console.error('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Error = Error;
    ; //Prints using the current debug formatting in error format
    function Info(text) { console.info('%c' + text, Debug.GenerateDebugFormatting()); }
    Debug.Info = Info;
    ; //Prints using the current debug formatting in info format
    function Clear() { console.clear(); }
    Debug.Clear = Clear;
    ; //Removes all data from the console
    function Spacer() { Debug.Log("\n"); }
    Debug.Spacer = Spacer;
    ; //Creates a blank space in the console, good for organising data
    function EndGroup() { console.groupEnd(); }
    Debug.EndGroup = EndGroup;
    ; //Will end the current group (like a tree structure)
    function CreateGroup(name) { console.group(name); }
    Debug.CreateGroup = CreateGroup;
    ; //Will create the beggining of a group (like a tree structure)
})(Debug || (Debug = {}));
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'LICENSE', which is part of this source code package.

    The specific goal of this file is to:
        - Wrap around already exisiting JS math fuctions
        - Add math functions specific to game programming
        - Define mathematical constants
*/
//A math class to make mathematic operations easier and more relivant to game programming
//And to standardize function calls.
var Mathf;
(function (Mathf) {
    /* ----- Constant values ----- */
    Mathf.pi = 3.1415926; //The ratio of the circumference to the perimeter of a circle
    Mathf.tau = 6.2831852; //Double PI, this will make certain operations faster
    Mathf.rounding = 0.005; //This is used as an epsilon value when comparing floats
    Mathf.infinite = Infinity; //Exactly what it sounds like.
    Mathf.radToDeg = 360 / Mathf.tau; //For converting radians to degrees
    Mathf.degToRad = (Mathf.pi * 2) / 360; //For converting degrees to radians 
    /* ----- Wrapper functions to overlay built in JS math functions ----- */
    //General
    function Abs(f) { return Math.abs(f); }
    Mathf.Abs = Abs;
    ; //The absolute value of 'foo' (makes it posative)
    function Sqrt(f) { return Math.sqrt(f); }
    Mathf.Sqrt = Sqrt;
    ; //Square root of 'f'
    function Root(f, n) { return Math.pow(f, 1.0 / n); }
    Mathf.Root = Root;
    ; //The 'n' root of 'f'
    function Pow(f, pow) { return Math.pow(f, pow); }
    Mathf.Pow = Pow;
    ; //'f' to the power of 'pow' 
    //Trig
    function Cos(f) { return Math.cos(f); }
    Mathf.Cos = Cos;
    ;
    function Sin(f) { return Math.sin(f); }
    Mathf.Sin = Sin;
    ;
    function Tan(f) { return Math.tan(f); }
    Mathf.Tan = Tan;
    ;
    function Acos(f) { return Math.acos(f); }
    Mathf.Acos = Acos;
    ;
    function Asin(f) { return Math.asin(f); }
    Mathf.Asin = Asin;
    ;
    function Atan(f) { return Math.atan(f); }
    Mathf.Atan = Atan;
    ;
    function Atan2(f, b) { return Math.atan2(f, b); }
    Mathf.Atan2 = Atan2;
    ;
    //Rounding
    function Ceil(f) { return Math.ceil(f); }
    Mathf.Ceil = Ceil;
    ;
    function Floor(f) { return Math.floor(f); }
    Mathf.Floor = Floor;
    ;
    function Round(f) { return Math.round(f); }
    Mathf.Round = Round;
    ;
    function Max(f, b) { return Math.max(f, b); }
    Mathf.Max = Max;
    ;
    function Min(f, b) { return Math.min(f, b); }
    Mathf.Min = Min;
    ;
    /* ----- Useful functions ----- */
    //Logarithmics...
    function Log(f) { return Math.log(f); }
    Mathf.Log = Log;
    ; //For the natural log of 'f'
    function Log2(f) { return Mathf.Logbase(f, 2); }
    Mathf.Log2 = Log2;
    ; //'f' log 2
    function Log10(f) { return Mathf.Logbase(f, 10); }
    Mathf.Log10 = Log10;
    ; //'f' log 10
    function Logbase(f, base) { return Math.log(f) / Math.log(base); }
    Mathf.Logbase = Logbase;
    ; //The 'base' log of 'f'
    //Allows for the modulus operation on floats (decimals)
    function Mod(num, div) { return div * ((num / div) - Mathf.Floor(num / div)); }
    Mathf.Mod = Mod;
    ;
    //Returns a number that has forced 'value' inbetween 'minimum' and 'maximum'
    function Clamp(value, minimum, maximum) {
        //Combine the maximum and mimumm functions to achive this
        return Mathf.Max(minimum, Mathf.Min(value, maximum));
    }
    Mathf.Clamp = Clamp;
    ;
    //Clamps 'value' between 0 and 1
    function Clamp01(value) { return Mathf.Clamp(value, 0.0, 1.0); }
    Mathf.Clamp01 = Clamp01;
    ;
    //Linearly interpolate 't' between two floats ('a' and 'b')
    function LerpUnclamped(a, b, t) {
        //Just use equation from:
        //(1 - t) * v0 + t * v1
        //https://devblogs.nvidia.com/parallelforall/lerp-faster-cuda/
        return (1 - t) * a + t * b;
    }
    Mathf.LerpUnclamped = LerpUnclamped;
    ;
    //A lerp where 't' cannot exceed 'b' and go below 'a'
    function Lerp(a, b, t) { return Mathf.LerpUnclamped(a, b, Mathf.Clamp01(t)); }
    Mathf.Lerp = Lerp;
    ;
    //Smoothdamp, much like lerp interpolates between values
    //But smoothing (much like a broad cubic function)
    //Apply the equation:
    //fn(x) = 3x^2 - 2x^3
    //This is in the form of a wuatratic equation
    //Source: https://en.wikipedia.org/wiki/Smoothstep
    // http://http.developer.nvidia.com/Cg/smoothstep.html
    function SmoothStep(left, right, x) {
        //Clamp the value
        x = Mathf.Clamp01((x - left) / (right - left));
        //Evaluate quadratic
        return x * x * (3.0 - 2.0 * x);
    }
    Mathf.SmoothStep = SmoothStep;
    ;
    //Default values for left and right are used
    function SmoothStep01(x) { return Mathf.SmoothStep(0.0, 1.0, x); }
    Mathf.SmoothStep01 = SmoothStep01;
    ;
    //Similar to SmoothStep but with the equation:
    //6x^5 - 15x^4 + 10x^3
    function SmootherStep(left, right, x) {
        //Scale and clamp
        var nx = Mathf.Clamp01((x - left) / (right - left));
        //Evaluate
        return nx * nx * nx * (nx * (nx * 6 - 15) + 10);
    }
    Mathf.SmootherStep = SmootherStep;
    ;
    //Default values for left and right are used
    function SmootherStep01(x) { return Mathf.SmootherStep(0.0, 1.0, x); }
    Mathf.SmootherStep01 = SmootherStep01;
    ;
    //Find the sign (posative of negative) of 'number' and return either 0 or 1 to correspond
    //Note: 0 is considered a posative number
    function Sign(foo) { return (foo < 0.0) ? -1.0 : 1.0; }
    Mathf.Sign = Sign;
    ;
    //Like lerping but the 'delta' will never exceed a delta, and an addative method is used
    function MoveTowards(current, target, delta) {
        //Make sure distance is less than delta
        if (Mathf.Abs(target - current) <= delta)
            return target;
        //Otherwise apply a lerp
        return current + Mathf.Sign(target - current) * delta;
    }
    Mathf.MoveTowards = MoveTowards;
    ;
    //Like movetowards but it corrects for angles around 360 and 0.
    function MoveTowardsAngle(current, target, delta) {
        target = current + Mathf.DeltaAngle(current, target);
        return Mathf.MoveTowards(current, target, delta);
    }
    Mathf.MoveTowardsAngle = MoveTowardsAngle;
    ;
    //Will bounce 'value' between 'min' and 'max'. 
    //Like clamping but once the max value is exceeded the result will start to move down and vise versa.  
    function Bounce(value, min, max) {
        var range = max - min;
        var state = Mathf.Mod(value - min, 2 * range);
        if (state > range)
            state = (2 * range) - state;
        return state + min;
    }
    Mathf.Bounce = Bounce;
    ;
    //Overloading the bounce function
    function Bounce0(value, max) { return Mathf.Bounce(value, 0.0, max); }
    Mathf.Bounce0 = Bounce0;
    ;
    function Bounce01(value) { return Mathf.Bounce(value, 0.0, 1.0); }
    Mathf.Bounce01 = Bounce01;
    ;
    //This will find the percentage through a lerp based on paramters
    //Inverse lerp - not done
    //Find the the closest difference between two angles
    //So this value may never exceed 180 degrees
    //Warning slow..
    function DeltaAngle(current, target) {
        //FInd difference
        var diff = target - current;
        //Adjust signs
        while (diff < -180)
            diff += 360;
        while (diff > 180)
            diff -= 360;
        //Done
        return diff;
    }
    Mathf.DeltaAngle = DeltaAngle;
    ;
    //Find the value as a power of two
    function ClosestBinaryPower(value) {
        //Needs	 the find the 2 root of the value then round that to an int
        return Mathf.Round(Mathf.Pow(Mathf.Round(Mathf.Sqrt(value)), 2));
    }
    Mathf.ClosestBinaryPower = ClosestBinaryPower;
    ;
    function IsBinaryPower(value) { return Mathf.ClosestBinaryPower(value) == value; }
    Mathf.IsBinaryPower = IsBinaryPower;
    ;
    //Find the highest value in an unsorted number array named 'arr'
    function MaxArray(arr) {
        //Stores the best value
        var current_highest = 0;
        //Go through and set based on max
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > current_highest || i == 0) {
                current_highest = arr[i];
            }
        }
        //Done
        return current_highest;
    }
    Mathf.MaxArray = MaxArray;
    ;
    //Find the lowest value in an unsorted number array named 'arr'
    function MinArray(arr) {
        //Stores the best value
        var current_lowest = 0;
        //Go through and set based on max
        for (var i = 0; i < arr.length; i++)
            if (arr[i] < current_lowest || i == 0) {
                current_lowest = arr[i];
            }
        //Done
        return current_lowest;
    }
    Mathf.MinArray = MinArray;
    ;
    //Because of slight round errors in floats, this should be used when comparing two values
    //For example Sqrt(9) == 3 should return true, but it will return false because of rounding errors
    function Approximatly(a, b, round) {
        if (round === void 0) { round = Mathf.rounding; }
        return Mathf.Abs(a - b) < round;
    }
    Mathf.Approximatly = Approximatly;
})(Mathf || (Mathf = {}));
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'LICENSE', which is part of this source code package.

    The specific goal of this file is to:
        - Make random number generation more convenient
*/
//For easy random number generation
var Rand;
(function (Rand) {
    //Random number between 'min' and 'max'
    function Range(min, max) { return (Math.random() * (max - min)) + min; }
    Rand.Range = Range;
    ;
    //Generates a random number between 0 and 1
    function Value() { return Math.random(); }
    Rand.Value = Value;
    ;
    //Generate a random integer 
    function RandBin() { return Rand.RandInt(0, 2); }
    Rand.RandBin = RandBin;
    ;
    function RandInt(min, max) { return Mathf.Round(Rand.Range(min, max)); }
    Rand.RandInt = RandInt;
    ;
})(Rand || (Rand = {}));
/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'LICENSE', which is part of this source code package.

    The specific goal of this file is to:
        - Have a class that defined a 2D point
        - Centralise vector mathematics into static functions
        - Continas definitions for commonly used vectors
*/
//This is a class that can be used to make 2D calculations easier
var Vector2 = (function () {
    //Constructor will set properties
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    //Public functions that are non static
    Vector2.prototype.ArrayRef = function (index) { return (index == 0) ? this.x : this.y; }; //Will take an index and return either the x or y component
    Vector2.prototype.SqrMagnitude = function () { return (this.x * this.x) + (this.y * this.y); }; //Will find the square length of a vector from the origin
    Vector2.prototype.Magnitude = function () { return Mathf.Sqrt(this.SqrMagnitude()); }; //Will find the lenght of a vector from the origin
    Vector2.prototype.Clone = function () { return new Vector2(this.x, this.y); }; //Make sure no to use a pointer to the current object
    Vector2.prototype.Normalize = function () {
        var result = new Vector2(0, 0);
        var mag = this.Magnitude();
        //Apply
        result.x = this.x / mag;
        result.y = this.y / mag;
        //Done
        return result;
    };
    //Static vector math functions:
    Vector2.Dot = function (lhs, rhs) { return (lhs.x * rhs.x) + (lhs.y * rhs.y); };
    Vector2.Det = function (lhs, rhs) { return (lhs.x * rhs.y) - (lhs.y * rhs.x); };
    Vector2.Angle = function (from, to) { return Mathf.Atan2(Vector2.Dot(from, to), Vector2.Det(from, to)); };
    Vector2.SqrDistance = function (a, b) { return Mathf.Pow(b.x - a.x, 2) + Mathf.Pow(b.y - a.y, 2); };
    Vector2.Distance = function (a, b) { return Mathf.Sqrt(Vector2.SqrDistance(a, b)); };
    Vector2.SetMagnitude = function (vec, mag) { return Vector2.Mul(vec.Normalize(), mag); };
    Vector2.ClampMagnitude = function (vec, min, max) { return Vector2.SetMagnitude(vec, Mathf.Clamp(vec.Magnitude(), min, max)); };
    Vector2.Lerp = function (a, b, t) { return new Vector2(Mathf.Lerp(a.x, b.x, t), Mathf.Lerp(a.y, b.y, t)); };
    Vector2.LerpUnclamped = function (a, b, t) { return new Vector2(Mathf.LerpUnclamped(a.x, b.x, t), Mathf.LerpUnclamped(a.y, b.y, t)); };
    Vector2.Max = function (l, r) { return new Vector2((l.x > r.x) ? l.x : r.x, (l.y > r.y) ? l.y : r.y); };
    Vector2.Min = function (l, r) { return new Vector2((l.x < r.x) ? l.x : r.x, (l.y < r.y) ? l.y : r.y); };
    Vector2.MoveTowards = function (c, t, d) { return new Vector2(Mathf.MoveTowards(c.x, t.x, d), Mathf.MoveTowards(c.y, t.y, d)); };
    //Helpful static functions
    Vector2.RoundInt = function (vec) { return new Vector2(vec.x, vec.y); };
    Vector2.Random = function () { return new Vector2(Rand.Value(), Rand.Value()); };
    //This will find the reflection of a vector based on a normal provided:
    //  V  N   R
    //  \  |  /
    //   \ | /
    //    \|/
    //  -------
    // V = The input (of velocity) vector
    // N = The normal (needs to be a unit vector)
    // R = Result of the function
    Vector2.Reflect = function (velocity, normal) {
        //Using the formula
        //R = -2*(V dot N)*N + V
        return Vector2.Add(Vector2.Mul(-2 * Vector2.Dot(velocity, normal), normal), velocity);
    };
    //Operator overloading, kinda
    Vector2._AddOperator = function (result, val) { return result += val; };
    Vector2._SubOperator = function (result, val) { return result -= val; };
    Vector2._MulOperator = function (result, val) { return result *= val; };
    Vector2._DivOperator = function (result, val) { return result /= val; };
    Vector2._Operation = function (li, operator) {
        //Stores the result of the calculation
        var result = (li[0] instanceof Vector2) ? li[0].Clone() : new Vector2(li[0], li[0]);
        //Allows for infinte arguments to be parsed
        //Check the type, then apply to the result
        for (var i = 1; i < li.length; i++) {
            if (li[i] instanceof Vector2) {
                result.x = operator(result.x, li[i].x);
                result.y = operator(result.y, li[i].y);
            }
            else {
                result.x = operator(result.x, li[i]);
                result.y = operator(result.y, li[i]);
            }
        }
        //Done
        return result;
    };
    //Actual overloading
    Vector2.Add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this._Operation(args, Vector2._AddOperator);
    };
    Vector2.Sub = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this._Operation(args, Vector2._SubOperator);
    };
    Vector2.Mul = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this._Operation(args, Vector2._MulOperator);
    };
    Vector2.Div = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this._Operation(args, Vector2._DivOperator);
    };
    //Misc overloading
    Vector2.ToString = function (val) { return val.x + " " + val.y; };
    Vector2.Equal = function (a, b) { return (Mathf.Approximatly(a.x, b.x) && Mathf.Approximatly(a.y, b.y)); };
    Vector2.NotEqual = function (a, b) { return (!Mathf.Approximatly(a.x, b.x) || !Mathf.Approximatly(a.y, b.y)); };
    //Static built in specific vectors
    Vector2.zero = new Vector2(0, 0);
    Vector2.one = new Vector2(1, 1);
    Vector2.minus = new Vector2(-1, -1);
    Vector2.left = new Vector2(-1, 0);
    Vector2.right = new Vector2(1, 0);
    Vector2.up = new Vector2(0, 1);
    Vector2.down = new Vector2(0, -1);
    return Vector2;
}());
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
var Base = (function () {
    //Constructor does nothing
    function Base(name) {
        if (name === void 0) { name = "new"; }
        //Evey thing in the engine needs to have these properties
        this.name = "";
        //Any object gets a unique instance ID
        this.instanceID = Base.instanceCounter;
        this.name = name;
    }
    Object.defineProperty(Base, "instanceCounter", {
        get: function () { Base._instanceCounter += 1; return Base._instanceCounter; },
        enumerable: true,
        configurable: true
    });
    //A function for cloning the current object
    Base.prototype.Clone = function () {
        //Get the constructror for the class
        var result = new this.constructor;
        //Loop though all attributes
        for (var attribute in this) {
            //Replace all properties
            if (typeof (this[attribute]) == 'object') {
                result[attribute] = this.Clone();
            }
        }
        //Done
        return result;
    };
    //A function for converting the class into a printable string
    Base.prototype.ToString = function () { return this.name + " : " + this.constructor.name + " - InstanceID : " + this.instanceID; };
    Base.prototype.Destroy = function () { delete this; };
    //Static functions
    Base.Destroy = function (object) { object.Destroy(); };
    Base.Instantiate = function (original) { return original.Clone(); };
    //This static function holds the current instance ID
    Base._instanceCounter = 0;
    return Base;
}());
//This is the base class for any possible node in the scene graph
var SceneNode = (function (_super) {
    __extends(SceneNode, _super);
    //Construct and destruct - not supported as of ECMA 6
    function SceneNode() {
        _super.call(this);
        //Private properties
        this._children = [];
    }
    //Needs to update all children
    SceneNode.prototype.Update = function () {
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].Update();
        }
    };
    // --  Functions for interacting with children --
    //This function will remove the node from the scene
    //Serves to delete all children of the current node
    SceneNode.prototype.Destroy = function () {
        //Remove all children
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].Destroy();
        }
        this._children = [];
    };
    //Will add an element to the children list
    SceneNode.prototype.AddChild = function (child) { this._children.push(child); };
    return SceneNode;
}(Base));
//Any component - remeber this is different from a body has these properties
var Component = (function () {
    function Component() {
        this.foo = 4;
    }
    return Component;
}());
//The transform class holds properties about the 3 axis of freedom
var Transform = (function () {
    //Constructor set properties
    function Transform(position, scale, rot) {
        if (position === void 0) { position = Vector2.zero; }
        if (scale === void 0) { scale = Vector2.one; }
        if (rot === void 0) { rot = 0.0; }
        this.position = position;
        this.scale = scale, this.rotation = rot;
    }
    return Transform;
}());
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
var Body = (function () {
    function Body() {
        //Later different components will be added, but for now they are manually created
        this.transform = new Transform();
        //Privates
        this._components = {}; //A dictionary containing all the components
    }
    //These functions allows for the manipulation of components - static
    //Body.prototype.SetComponent = function(key, value) { this._components[key.name] = value; }
    Body.prototype.GetComponent = function (key) { return this._components[(new key()).constructor.name]; };
    Body.prototype.AddComponent = function (key) { this._components[(new key()).constructor.name] = new key(); };
    Body.prototype.RemoveComponent = function (key) { delete this._components[(new key()).constructor.name]; };
    Body.prototype.TestComponents = function () {
        //Loop through components and print
        for (var key in this._components) {
            if (this._components.hasOwnProperty(key)) {
                Debug.CreateGroup(key);
                Debug.RawLog(this._components[key]);
                Debug.EndGroup();
            }
        }
    };
    return Body;
}());
//Stores the types of colliders
var ColliderType;
(function (ColliderType) {
    ColliderType[ColliderType["box"] = 0] = "box";
    ColliderType[ColliderType["circle"] = 1] = "circle"; //Circle with a radius
})(ColliderType || (ColliderType = {}));
;
//The base class for all physics shapes
//There is no constructor for the base class
var Collider = (function () {
    function Collider() {
        this.enabled = true; //Weather this collision shape is active
        this.bounds = new Vector2(1, 1); //Holds the volume bounds of the AABB shape
    }
    return Collider;
}());
//A box collider will inherit from the shape class
//Size and center are both Vector2s
var RectCollider = (function (_super) {
    __extends(RectCollider, _super);
    //Call base constructor
    function RectCollider(size, center) {
        if (size === void 0) { size = Vector2.one; }
        if (center === void 0) { center = Vector2.zero; }
        _super.call(this);
        this.size = size;
        this.center = center;
    }
    //Base class functions
    RectCollider.prototype.Clone = function () { return this; }; //Wrong for now..
    return RectCollider;
}(Collider));
//An axis aligned bounding box serves as the base of all collision detection
//This means a box that has its axis alligned with the coordinate system
//It cannot be rotated and is always made of horizontal / vertical lines
//This is known as a bounding box
var AABB = (function () {
    //Construct
    function AABB(min, max) {
        this.min = min;
        this.max = max;
    }
    //Static collision check functions
    AABB.CheckCollision = function (a, b) {
        //Later this will use the S A T
        //Project onto the X and Y axis, then check for overlap
        if (a.max.x < b.min.x || a.min.x > b.max.x) {
            return false;
        }
        if (a.max.y < b.min.y || a.min.y > b.max.y) {
            return false;
        }
        //Success
        return true;
    };
    return AABB;
}());
//Circle is sometimes a better bounding than an AABB
var Circle = (function () {
    //Set public values
    function Circle(position, radius) {
        this.position = position;
        this.radius = radius;
    }
    //Statics
    //Checks a collision between two circles
    Circle.CheckCollision = function (a, b) {
        //Compares the distance vs the radius
        var sqrRadius = Mathf.Pow(Mathf.Abs(a.radius) + Mathf.Abs(b.radius), 2);
        var dist = Vector2.SqrDistance(a.position, b.position);
        //Compare the result
        return sqrRadius < dist;
    };
    return Circle;
}());
var Rigidbody = (function () {
    function Rigidbody() {
    }
    return Rigidbody;
}());
