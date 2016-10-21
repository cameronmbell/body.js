
//A math class to make mathematic operations easier and more relivant to game programming
var Mathf =
{
    /*
		Missing functions (This that should be added but I couldnt figure out):
		- Inverse learping - find the iterpolant between a and b based on t
		- Negative infinity - C++ does not support (I think)
	*/

	/* ----- Constant values ----- */
    pi : 3.1415926, //The circumference to the perimeter of a circle
    tau : 6.2831852, //Double 'pi'
    rounding : 0.005, //Temp
    infinite : Infinity, //Like: HUGE_VALF
    degToRad : (3.1415926 * 2) / 360, //For converting degrees to radians
    radToDeg : 360 / (3.1415926 * 2), //For converting radians to degrees

	/* ----- Wrapper functions ----- */

	//General
    Sqrt : function(f) { return Math.sqrt(f); },
    Pow : function(f, power) { return Math.pow(f, power); },
	Root : function(f, n) { return Math.pow(f, 1.0 / n); },
    Abs : function(foo) { return Math.abs(foo); },

	//Trig
    Cos : function(foo) { return Math.cos(foo); },
	Sin : function(foo) { return Math.sin(foo); },
    Tan : function(foo) { return Math.tan(foo); },
	Acos : function(foo) { return Math.acos(foo); },
	Asin : function(foo) { return Math.asin(foo); },
	Atan : function(foo) { return Math.atan(foo); },
	Atan2 : function(x, y) { return Math.atan2(x, y); },

	//Rounding
	Ceil : function(f) { return Math.ceil(f); },
	Floor : function(f) { return Math.floor(f); },
	Max : function(a, b) { return Math.max(a, b); },
	Min : function(a, b) { return Math.min(a, b); },
    Round : function(f) { return Math.round(f); },
    
	/* ----- Useful functions ----- */

    //Logarithmics...
    Logbase : function(f, base)
	{
		//Consider C++ only priveds a base 2 and 10 log
		//The other base must be calculated
		return Math.log(f) / Math.log(base);
	},
    Log : function(f) { return Math.log(f); },
	Log2 : function(f) { return Mathf.Logbase(f, 2); },
	Log10 : function(f) { return Mathf.Logbase(f, 10); },
    
	//Since the JS '%' doesnt support floats
	Mod : function(num, div) { return div * ((num / div) - Mathf.Floor(num / div)); },

	//Returns a value inbetween min and max
	Clamp : function(value, minimum, maximum)
	{
		//Combine the maximum and mimumm functions to achive this
		return Mathf.Max(minimum, Mathf.Min(value, maximum));
	},

	//Clamps between 0 and 1
	Clamp01 : function(value) { return Mathf.Clamp(value, 0.0, 1.0); },

    //Linearly interpolate between two floats by t
    LerpUnclamped : function(a, b, t)
	{
		//Just use equation from:
		//(1 - t) * v0 + t * v1
		//https://devblogs.nvidia.com/parallelforall/lerp-faster-cuda/
		return (1 - t) * a + t * b;
	},
    
    Lerp : function(a, b, t) { return Mathf.LerpUnclamped(a, b, Mathf.Clamp01(t)); },
    
	//Smoothdamp, much like lerp interpolates between values
	//But smoothing (much like a broad cubic function)
	//Apply the equation:
	//fn(x) = 3x^2 - 2x^3
	//This is in the form of a wuatratic equation
	//Source: https://en.wikipedia.org/wiki/Smoothstep
	// http://http.developer.nvidia.com/Cg/smoothstep.html
    SmoothStep : function(left, right, x)
	{
		//Clamp the value
		x = Mathf.Clamp01((x - left) / (right - left));

		//Evaluate quadratic
		return x * x * (3.0 - 2.0 * x);
	},
    SmoothStep01 : function(x) { return Mathf.SmoothStep(0.0, 1.0, x); },

	//Similar but with the equation:
	//6x^5 - 15x^4 + 10x^3
    SmootherStep : function(left, right, x)
	{
		//Scale and clamp
		var nx = Mathf.Clamp01((x - left) / (right - left));

		//Evaluate
		return nx * nx * nx * (nx * (nx * 6 - 15) + 10);
	},
    SmootherStep01 : function(x) { return Mathf.SmootherStep(0.0, 1.0, x); },

	//Find the sign (posative of negative) of a number
	//Note: 0 is considered a posative number
    Sign : function(foo) { return (foo < 0.0) ? -1.0 : 1.0; },

	//Like lerping but the value will never exceed a delta
    MoveTowards : function(current, target, delta)
	{
		//Make sure distance is less than delta
		if (Mathf.Abs(target - current) <= delta) return target;

		//Otherwise apply a lerp
		return current + Mathf.Sign(target - current) * delta;
	},
    
    //Like movetowards but it corrects for angles
    MoveTowardsAngle : function(current, target, delta)
    {
        target = current + Mathf.DeltaAngle(current, target);
        return Mathf.MoveTowards(current, target, delta)
    },

	//Ping pong will loop a value between 0 and the upper limit
    Bounce : function(value, min, max)
	{
		var range = max - min;
		var state = Mathf.Mod(value - min, 2 * range);

		if (state > range)
			state = (2 * range) - state;

		return state + min;
	},

	//Overload
    Bounce0 : function(value, max) { return Mathf.Bounce(value, 0.0, max); },
    Bounce01 : function(value)     { return Mathf.Bounce(value, 0.0, 1.0); },

	//This will find the percentage trhough a lerp based on paramters
	//Inverse lerp - not done

	//Find the the closest difference between two angles
    DeltaAngle : function(current, target)
	{
		//FInd difference
		var diff = target - current;

		//Adjust signs
		while (diff < -180) diff += 360;
		while (diff > 180) diff -= 360;

		//Done
		return diff;
	},

	//Find the value as a power of two
    ClosestBinaryPower : function(value)
	{
		//Needs	 the find the 2 root of the value then round that to an int
		return Mathf.Round(Mathf.Pow(Mathf.Round(Mathf.Sqrt(value)), 2));
	},
    IsBinaryPower : function(value) { return Mathf.ClosestBinaryPower(value) == value; },

	//Find the max where:
	//Arr is a heap array
    MaxArray : function(arr)
	{
		//Stores the best value
		var current_highest = 0;

		//Go through and set based on max
		for (var i = 0; i < arr.length; i++) 
            if (arr[i] > current_highest || i == 0) { current_highest = arr[i]; }

		//Done
		return current_highest;
	},

	//Find the min where:
	//Arr is a heap array
	//size is the BYTE size
    MinArray : function(arr)
	{
		//Stores the best value
		var current_lowest = 0;

		//Go through and set based on max
		for (var i = 0; i < arr.length; i++) 
            if (arr[i] < current_lowest || i == 0) { current_lowest = arr[i]; }

		//Done
		return current_lowest;
	},

	//Because of slight round errors in floats, this should be used when comparing
    Approximatly : function(a, b, round = Mathf.rounding) 
    { return Mathf.Abs(a - b) < round; }
};