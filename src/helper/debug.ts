/*
    Copyright 2016 Cameron Bell - Obtuse Studios

    This file is subject to the terms and conditions defined in
    file 'LICENSE', which is part of this source code package.

    The specific goal of this file is to:
        - Wrap around JS console functions
        - Easier colour managment in the console
*/

//Wrapper (static) class for now that wraps around the built in console operations
namespace Debug
{
    //Properties when logging
    export let backgroundColour = 'white';
    export let textColour : 'black';
    export let fontSize : 'normal';

    //Holds the current debug string
    export function GenerateDebugFormatting() : string
    {
        //Create CSS Style info for the text
        return 'color: ' + Debug.textColour + ';' +
               'font-size: ' + Debug.fontSize + ';' +
               'background: ' + Debug.backgroundColour + ';';
    };

    //Will reset the formatting properties
    export function ResetFormatting() : void
    {
        //Revert back to defualt values
        Debug.backgroundColour = 'white';
        Debug.textColour = 'black';
        Debug.fontSize = 'normal';
    };

    //Wrappers that add some functionality
    export function RawLog(data : any) : void       { console.log(data); }; //Will print the param with console log directly, this is good for pritinf objects
    export function Log(text : string) : void       { console.log('%c' + text, Debug.GenerateDebugFormatting()); }; //Prints using the current debug formatting
    export function Warning(text : string) : void   { console.warn('%c' + text, Debug.GenerateDebugFormatting()); }; //Prints using the current debug formatting in warning format
    export function Error(text : string) : void     { console.error('%c' + text, Debug.GenerateDebugFormatting()); }; //Prints using the current debug formatting in error format
    export function Info(text : string) : void      { console.info('%c' + text, Debug.GenerateDebugFormatting()); }; //Prints using the current debug formatting in info format
    export function Clear() : void                  { console.clear(); }; //Removes all data from the console
    export function Spacer() : void                 { Debug.Log("\n") }; //Creates a blank space in the console, good for organising data
    export function EndGroup() : void               { console.groupEnd(); }; //Will end the current group (like a tree structure)
    export function CreateGroup(name : string):void { console.group(name); }; //Will create the beggining of a group (like a tree structure)
}