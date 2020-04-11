//html setup

var itemsHtmlColletion = document.getElementsByClassName('paralax-item');
var itemsA = Array.from(itemsHtmlColletion);
var html = document.documentElement

var scrollAmt = html.scrollTop;
var scrollMax = html.scrollHeight - window.innerHeight;


//console.log ('pupilsA', pupilsA);


// input
var input = {
    scrollY: {
        start: 0,
        end: html.scrollHeight - window.innerHeight,
        current: 0,

    },


    mouseX: {
        start: 0,
        end: window.innerWidth,
        current: 0,

    },

    mouseY: {

        start: 0,
        end: window.innerHeight,
        current: 0,

    },
}
input.scrollY.range = input.scrollY.end - input.scrollY.start;
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// output

var output = {
    X: {
        start: -150,
        end: 150,
        current: 0,

    },
    Y: {
        start: -150,
        end: 150,
        current: 0,

    },
    scrollY: {
        start: 0,
        end: 600,
        current: 0,

    },
    zIndex: {
        range: 10000,
    },
    scale: {
        start: 1,
        end: 0.2,

    },
    blur: {
        startingdepth: 0.2,
        range:20,

    },
}
output.scale.range = output.scale.end - output.scale.start
output.X.range = output.X.end - output.X.start
output.Y.range = output.Y.end - output.Y.start
output.scrollY.range = output.scrollY.end - output.scrollY.start

var mouse = {
    x: window.innerWidth / 0.5,
    y: window.innerHeight / 0.5,
}

// mouse X Y

var updateInputs = function() {
    // mouse X input
    input.mouseX.current= mouse.x;
    input.mouseX.fraction= (input.mouseX.current - input.mouseX.start)/ input.mouseX.range;
    // mouse Y input
    input.mouseY.current= mouse.y;
    input.mouseY.fraction= (input.mouseY.current - input.mouseY.start)/ input.mouseY.range;
    // scroll y input
    input.scrollY.current = html.scrollTop;
    input.scrollY.fraction= (input.scrollY.current - input.scrollY.start)/ input.scrollY.range;

}

var updateOutputs = function() {

    output.X.current= output.X.end - (input.mouseX.fraction * output.X.range);
    
    output.Y.current= output.Y.end - (input.mouseY.fraction * output.Y.range);

    output.scrollY.current= output.scrollY.start + (input.scrollY.fraction * output.scrollY.range);



}

var updateEachparalaxitem = function() {
    
      //apply output to html

    itemsA.forEach(function (item, k) {
        var depth = parseFloat(item.dataset.depth, 10);
        var itemInput = {
            scrollY: {
                start: item.offsetParent.offsetTop,
                end: item.offsetParent.offsetTop + window.innerHeight,
            }
        }
        itemInput.scrollY.range = itemInput.scrollY.end - itemInput.scrollY.start;
        itemInput.scrollY.fraction= (input.scrollY.current - itemInput.scrollY.start)/ itemInput.scrollY.range;
        var itemOutputYcurrent = output.scrollY.start + (itemInput.scrollY.fraction * output.scrollY.range);

        var itemOutput = {
            x: output.X.current-(output.X.current * depth),
            y: (itemOutputYcurrent* depth) + (output.Y.current - (output.Y.current*depth)),
            zIndex: output.zIndex.range - (output.zIndex.range * depth),
            scale: output.scale.start + (output.scale.range * depth),
            blur: (depth - output.blur.startingdepth)*output.blur.range,
    }
    console.log (k,'depth', depth)
    item.style.filter = 'blur('+itemOutput.blur+'px)'
    item.style.zIndex = itemOutput.zIndex
    item.style.transform = 'scale('+itemOutput.scale+') translate('+itemOutput.x+'px,'+itemOutput.y+'px)';



});

}

var handleMouseMove = function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    updateInputs();
    updateOutputs();
    updateEachparalaxitem();

    // if (input.mouseX.fraction > 1) {
    //     input.mouseX.fraction = 1;
    // }
    // if (input.mouseX.fraction <0) {
    //     input.mouseX.fraction = 0;
    // }
    //console.log('output.x.current', output.x.current);
    //console.log('fraction Y', input.mouseY.fraction); 
}

var handleScroll = function() {
    updateInputs();
    updateOutputs();
    updateEachparalaxitem();
    
    var scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    // console.log ('scrolling!', scrollAmt, 'scrolmax', scrollMax)
}

var handleResize = function() {
    input.mouseX.end = (window.innerWidth)
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.mouseY.end = (window.innerHeight)
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.scrollY.end = html.scrollHeight - window.innerHeight;
    input.scrollY.range = input.scrollY.end - input.scrollY.start;
}



    
// eventlistener

window.addEventListener('mousemove', handleMouseMove)
window.addEventListener('resize', handleResize)
document.addEventListener('scroll', handleScroll)

updateInputs();
updateOutputs();
updateEachparalaxitem();