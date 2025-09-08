function printManyTimes(str) {
    "use strict";

    var sentence = str + "is cool!";

    sentence = str + "is now!";
    for(var i=0; i <str.length; 1+=2) {
        console.log(sentence);
    }
}
printManyTimes("freeCodeCamp");