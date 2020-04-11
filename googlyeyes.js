//html setup

var pupilsHtmlColletion = document.getElementsByClassName('pupil');
var pupilsA = Array.from(pupilsHtmlColletion);


//console.log ('pupilsA', pupilsA);


// input
var input = {
    mouseX: {
        start: 0,
        end: (window.innerWidth),
        current: 0,

    },

    mouseY: {

        start: 0,
        end: window.innerHeight,
        current: 0,

    },
}
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// output

var output = {
    X: {
        start: -75,
        end: 75,
        current: 0,

    },
    Y: {
        start: -75,
        end: 75,
        current: 0,

    },
}

output.X.range = output.X.end - output.X.start
output.Y.range = output.Y.end - output.Y.start

// mouse X Y


var handleMouseMove = function(event) {
// mouse X input
    input.mouseX.current= event.clientX;
    input.mouseX.fraction= (input.mouseX.current - input.mouseX.start)/ input.mouseX.range;
// mouse Y input
    input.mouseY.current= event.clientY;
    input.mouseY.fraction= (input.mouseY.current - input.mouseY.start)/ input.mouseY.range;
 
    // if (input.mouseX.fraction > 1) {
    //     input.mouseX.fraction = 1;
    // }
    // if (input.mouseX.fraction <0) {
    //     input.mouseX.fraction = 0;
    // }
    
// output X
    output.X.current= output.X.end - (input.mouseX.fraction * output.X.range);
    output.X.opposite= output.X.start + (input.mouseX.fraction * output.X.range);

// output Y
    output.Y.current= output.Y.start + (input.mouseY.fraction * output.Y.range);
    output.Y.opposite= output.Y.end - (input.mouseY.fraction * output.Y.range);

//apply output to html


pupilsA.forEach(function (pupil, k) {
    if (k === 0) {
        pupil.style.transform = 'translate('+output.X.opposite+'px,'+output.Y.opposite+'px)';
    }
    else {
        pupil.style.transform = 'translate('+output.X.current+'px,'+output.Y.current+'px)';
    }
    
    
});
   

    //console.log('output.x.current', output.x.current);
    //console.log('fraction Y', input.mouseY.fraction); 
}

var handleResize = function() {
    input.mouseX.end = (window.innerWidth)
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.mouseY.end = (window.innerHeight)
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
}


    
// eventlistener

window.addEventListener('mousemove', handleMouseMove)
window.addEventListener('resize', handleResize)