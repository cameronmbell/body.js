//Wrapper (static) class for now, but later physics body outlines will be added
var Debug = 
{
    //Properties when logging
    backgroundColour : 'white',
    textColour : 'black',
    fontSize : 'normal',
    
    //Holds the current debug string
    GenerateDebugFormatting : function() 
    { 
        //Create CSS Style info for the text
        return 'color: ' + Debug.textColour + ';' +
               'font-size: ' + Debug.fontSize + ';' +
               'background: ' + Debug.backgroundColour + ';'; 
    },
    
    //Will reset the formatting properties
    ResetFormatting : function() 
    {
        //Revert back to defualt values
        Debug.backgroundColour = 'white';
        Debug.textColour = 'black';
        Debug.fontSize = 'normal';
    },
    
    //Wrappers
    Log : function(text) { console.log('%c' + text, Debug.GenerateDebugFormatting()); },
    Warning : function(text) { console.warn('%c' + text, Debug.GenerateDebugFormatting()); },
    Error : function(text) { console.error('%c' + text, Debug.GenerateDebugFormatting()); },
    Info : function(text) { console.info('%c' + text, Debug.GenerateDebugFormatting()); },
    Clear : function() { console.clear(); },
    Spacer : function() { Debug.Log("\n") },
    CreateGroup: function(name) { console.group(name); },
    EndGroup: function() { console.groupEnd(); },
};  