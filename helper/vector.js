//These are classes that can be used to make calculations easier
function Vector2(x, y)
{
    //This is a 2D Engine
    this.x = x;
    this.y = y;

    //Public functions
    this.ArrayRef = function(index) { return (index == 0)? this.x : this.y; }
    this.Magnitude = function() { return Mathf.Sqrt((this.x * this.x) + (this.y * this.y)); }
    this.SqrMagnitude = function() { return (this.x * this.x) + (this.y * this.y); }
    this.Normalize = function()
    {
        var result = new Vector2(0, 0);
        var mag = this.Magnitude();

        //Apply
        result.x = this.x / mag;
        result.y = this.y / mag;

        //Done
        return result;
    }

    //Make sure that a pointer is not returned
    this.Clone = function() { return new Vector2(this.x, this.y); }
}

//Static variables, this would be used for operator overloading, if JS supported it
Vector2.zero = new Vector2(0, 0);
Vector2.one = new Vector2(1, 1);
Vector2.minus = new Vector2(-1, -1);
Vector2.left = new Vector2(-1, 0);
Vector2.right = new Vector2(1, 0);
Vector2.up = new Vector2(0, 1);
Vector2.down = new Vector2(0, -1);

//Math functions

//This will find the dot product of two vectors
//From: https://msdn.microsoft.com/en-us/library/microsoft.xna.framework.vector2.dot.aspx
Vector2.Dot = function(lhs, rhs) { return (lhs.x * rhs.x) + (lhs.y * rhs.y); }
Vector2.Det = function(lhs, rhs) { return (lhs.x * rhs.y) - (lhs.y * rhs.x);}
Vector2.Angle = function(from, to) { return Mathf.Atan2(Vector2.Dot(from, to), Vector2.Det(from, to)); }
Vector2.SqrDistance = function(a, b) { return Mathf.Pow(b.x - a.x, 2) + Mathf.Pow(b.y - a.y, 2); }
Vector2.Distance = function(a, b) { return Mathf.Sqrt(Vector2.SqrDistance(a, b)); }
Vector2.SetMagnitude = function(vec, mag) { return Vector2.Mul(vec.Normalize(), mag); }
Vector2.ClampMagnitude = function(vec, min, max) { return Vector2.SetMagnitude(vec, Mathf.Clamp(vec.Magnitude(), min, max)); }
Vector2.Lerp = function(a, b, t) { return new Vector2(Mathf.Lerp(a.x, b.x, t), Mathf.Lerp(a.y, b.y, t)); }
Vector2.LerpUnclamped = function(a, b, t) { return new Vector2(Mathf.LerpUnclamped(a.x, b.x, t), Mathf.LerpUnclamped(a.y, b.y, t)); }
Vector2.Max = function(l, r) { return new Vector2((l.x > r.x) ? l.x : r.x, (l.y > r.y) ? l.y : r.y); }
Vector2.Min = function(l, r) { return new Vector2((l.x < r.x) ? l.x : r.x, (l.y < r.y) ? l.y : r.y); }
Vector2.MoveTowards = function(c, t, d) { return new Vector2(Mathf.MoveTowards(c.x, t.x, d), Mathf.MoveTowards(c.y, t.y, d)); }

//This will find the reflection of a vector based on a normal provided:
// V  N   R
//  \  |  /
//   \ | /
//    \|/
//  -------
// V = The input (of velocity) vector
// N = The normal (needs to be a unit vector)
// R = Result of the function

Vector2.Reflect = function(velocity, normal)
{
    //Using the formula
    //R = -2*(V dot N)*N + V
    return Vector2.Add(Vector2.Mul(-2 * Vector2.Dot(velocity, normal), normal), velocity);
}

//Helpful static functions
Vector2.RoundInt = function(vec) { return new Vector2(vec.x, vec.y); }
Vector2.Random = function() { return new Vector2(Rand.Value(), Rand.Value()); }

//Operator overloading, kinda
Vector2.AddOperator = function(result, val) { return result += val; }
Vector2.SubOperator = function(result, val) { return result -= val; }
Vector2.MulOperator = function(result, val) { return result *= val; }
Vector2.DivOperator = function(result, val) { return result /= val; }

Vector2.Operation = function(li, operator)
{
    //Stores the result of the calculation
    var result = (li[0] instanceof Vector2) ? li[0] : new Vector2(li[0], li[0]);

    //Allows for infinte arguments to be parsed
    //Check the type, then apply to the result
    for(var i = 1; i < li.length; i++) {
        if(li[i] instanceof Vector2) { result.x = operator(result.x, li[i].x); result.y = operator(result.y, li[i].y); }
        else                         { result.x = operator(result.x, li[i]);   result.y = operator(result.y, li[i]); } }

    //Done
    return result;
}

//Actual overloading
Vector2.Add = function() { return Vector2.Operation(arguments, Vector2.AddOperator); }
Vector2.Sub = function() { return Vector2.Operation(arguments, Vector2.SubOperator); }
Vector2.Mul = function() { return Vector2.Operation(arguments, Vector2.MulOperator); }
Vector2.Div = function() { return Vector2.Operation(arguments, Vector2.DivOperator); }

//Misc overloading
Vector2.ToString = function(val) { return val.x + " " + val.y; }
Vector2.Equal = function(a, b) { return (Mathf.Approximatly(a.x, b.x) && Mathf.Approximatly(a.y, b.y)); }
Vector2.NotEqual = function(a, b) { return (!Mathf.Approximatly(a.x, b.x) || !Mathf.Approximatly(a.y, b.y)); }
