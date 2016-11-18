/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'LICENSE', which is part of this source code package.

    The specific goal of this file is to:
        - Make random number generation more convenient
*/

//For easy random number generation
namespace Rand
{
	//Random number between 'min' and 'max'
    export function Range(min : number, max : number) : number { return (Math.random() * (max - min)) + min; };
	
	//Generates a random number between 0 and 1
    export function Value() : number { return Math.random(); };

	//Generate a random integer 
    export function RandBin() : number { return Rand.RandInt(0, 2); };
    export function RandInt(min : number, max : number) : number { return Mathf.Round(Rand.Range(min, max)); };
}