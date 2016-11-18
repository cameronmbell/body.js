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
class Vector2
{
    //This is a 2D Engine
    public x : number;
    public y : number;

    //Constructor will set properties
    constructor(x : number, y : number) { this.x = x; this.y = y; }

    //Public functions that are non static
    public ArrayRef(index : number) : number{ return (index == 0)? this.x : this.y; } //Will take an index and return either the x or y component
    public SqrMagnitude() : number          { return (this.x * this.x) + (this.y * this.y); } //Will find the square length of a vector from the origin
    public Magnitude() : number             { return Mathf.Sqrt(this.SqrMagnitude()); } //Will find the lenght of a vector from the origin
    public Clone() : Vector2                { return new Vector2(this.x, this.y); } //Make sure no to use a pointer to the current object
    public Normalize() : Vector2 //Will find the direction from the origin of the current vector
    {
        var result = new Vector2(0, 0);
        var mag = this.Magnitude();

        //Apply
        result.x = this.x / mag;
        result.y = this.y / mag;

        //Done
        return result;
    }

    //Static built in specific vectors
    public static zero : Vector2    = new Vector2(0, 0);
    public static one : Vector2     = new Vector2(1, 1);
    public static minus : Vector2   = new Vector2(-1, -1);
    public static left : Vector2    = new Vector2(-1, 0);
    public static right : Vector2   = new Vector2(1, 0);
    public static up : Vector2      = new Vector2(0, 1);
    public static down : Vector2    = new Vector2(0, -1);

    //Static vector math functions:
    public static Dot(lhs : Vector2, rhs : Vector2)                        : number { return (lhs.x * rhs.x) + (lhs.y * rhs.y); }
    public static Det(lhs : Vector2, rhs : Vector2)                        : number { return (lhs.x * rhs.y) - (lhs.y * rhs.x);}
    public static Angle(from : Vector2, to : Vector2)                      : number { return Mathf.Atan2(Vector2.Dot(from, to), Vector2.Det(from, to)); }
    public static SqrDistance(a : Vector2, b : Vector2)                    : number { return Mathf.Pow(b.x - a.x, 2) + Mathf.Pow(b.y - a.y, 2); }
    public static Distance(a : Vector2, b : Vector2)                       : number { return Mathf.Sqrt(Vector2.SqrDistance(a, b)); }
    public static SetMagnitude(vec : Vector2, mag : number)                :Vector2 { return Vector2.Mul(vec.Normalize(), mag); }
    public static ClampMagnitude(vec : Vector2, min : number, max : number):Vector2 { return Vector2.SetMagnitude(vec, Mathf.Clamp(vec.Magnitude(), min, max)); }
    public static Lerp(a : Vector2, b : Vector2, t : number)              : Vector2 { return new Vector2(Mathf.Lerp(a.x, b.x, t), Mathf.Lerp(a.y, b.y, t)); }
    public static LerpUnclamped(a : Vector2, b : Vector2, t : number)     : Vector2 { return new Vector2(Mathf.LerpUnclamped(a.x, b.x, t), Mathf.LerpUnclamped(a.y, b.y, t)); }
    public static Max(l : Vector2, r : Vector2)                           : Vector2 { return new Vector2((l.x > r.x) ? l.x : r.x, (l.y > r.y) ? l.y : r.y); }
    public static Min(l : Vector2, r : Vector2)                           : Vector2 { return new Vector2((l.x < r.x) ? l.x : r.x, (l.y < r.y) ? l.y : r.y); }
    public static MoveTowards(c : Vector2, t : Vector2, d : number)       : Vector2 { return new Vector2(Mathf.MoveTowards(c.x, t.x, d), Mathf.MoveTowards(c.y, t.y, d)); }

    //Helpful static functions
    public static RoundInt(vec : Vector2) : Vector2 { return new Vector2(vec.x, vec.y); }
    public static Random() : Vector2 { return new Vector2(Rand.Value(), Rand.Value()); }

    //This will find the reflection of a vector based on a normal provided:
    //  V  N   R
    //  \  |  /
    //   \ | /
    //    \|/
    //  -------
    // V = The input (of velocity) vector
    // N = The normal (needs to be a unit vector)
    // R = Result of the function
    public static Reflect(velocity : Vector2, normal : Vector2) : Vector2
    {
        //Using the formula
        //R = -2*(V dot N)*N + V
        return Vector2.Add(Vector2.Mul(-2 * Vector2.Dot(velocity, normal), normal), velocity);
    }

    //Operator overloading, kinda
    private static _AddOperator(result : number, val : number) : number { return result += val; }
    private static _SubOperator(result : number, val : number) : number { return result -= val; }
    private static _MulOperator(result : number, val : number) : number { return result *= val; }
    private static _DivOperator(result : number, val : number) : number { return result /= val; }

    private static _Operation(li : any, operator : any) //'operator' should be from one of the above functions
    {
        //Stores the result of the calculation
        var result = (li[0] instanceof Vector2) ? li[0].Clone() : new Vector2(li[0], li[0]);

        //Allows for infinte arguments to be parsed
        //Check the type, then apply to the result
        for(var i = 1; i < li.length; i++) {
            if(li[i] instanceof Vector2) { result.x = operator(result.x, li[i].x); result.y = operator(result.y, li[i].y); }
            else                         { result.x = operator(result.x, li[i]);   result.y = operator(result.y, li[i]); } }

        //Done
        return result;
    }
    
    //Actual overloading
    public static Add(...args : any[]) : Vector2 { return this._Operation(args, Vector2._AddOperator); }
    public static Sub(...args : any[]) : Vector2 { return this._Operation(args, Vector2._SubOperator); }
    public static Mul(...args : any[]) : Vector2 { return this._Operation(args, Vector2._MulOperator); }
    public static Div(...args : any[]) : Vector2 { return this._Operation(args, Vector2._DivOperator); }

    //Misc overloading
    public static ToString(val : Vector2)                : string { return val.x + " " + val.y; }
    public static Equal(a : Vector2, b : Vector2)       : boolean { return (Mathf.Approximatly(a.x, b.x) && Mathf.Approximatly(a.y, b.y)); }
    public static NotEqual(a : Vector2, b : Vector2)    : boolean { return (!Mathf.Approximatly(a.x, b.x) || !Mathf.Approximatly(a.y, b.y)); }
}