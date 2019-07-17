'use strict';
//Global Initial Parameters:

var initialVec = [-2, -2, 2];
var historyVectors = [initialVec];
var historyIndex = 0;
var historyCount = 0;
var historyLimit = 10;
var radius = 2*Math.sqrt(3);
var sphere = new Sphere(radius).gObject("#02893B", "#02893B");
var axes = createAxes(4);
var layout = {
    autosize: true,
    margin: {l:0, r:0, t:0, b:0},
    hovermode: "closest",
    showlegend: false,
    scene: {
        camera: {
            up: {x: 0, y: 0, z: 1},
            eye: {x: -0.5, y: -1.5, z: 0.9},
            center: {x: 0, y: 0, z: -0.15}
        },
        aspectratio: {x:1, y:1, z:1},
        xaxis: {range: [-4, 4], autorange: false, zeroline: true,},
        yaxis: {range: [-4, 4], autorange: false, zeroline: true,},
        zaxis: {range: [-4, 4], autorange: false, zeroline: true,},
    }
};

//Matrix Utilities:
/** Rotation Matrix about x-axis */
function rotationX(angle) {
    var matrix = [[1, 0, 0], [0, Math.cos(angle), -Math.sin(angle)], [0, Math.sin(angle), Math.cos(angle)]];
    return matrix;
}
/** Rotation Matrix about y-axis */
function rotationY(angle) {
    var matrix = [[Math.cos(angle), 0, Math.sin(angle)], [0, 1, 0], [-Math.sin(angle), 0, Math.cos(angle)]];
    return matrix;
}
/** Rotation Matrix about z-axis */
function rotationZ(angle) {
    var matrix = [[Math.cos(angle), -Math.sin(angle), 0], [Math.sin(angle), Math.cos(angle), 0], [0, 0 ,1]];
    return matrix;
}
/** Scalation Matrix in x-direction */
function scaleX(factor) {
    var matrix = [[factor, 0, 0], [0, 1, 0], [0, 0, 1]];
    return matrix;
}
/** Scalation Matrix in y-direction */
function scaleY(factor) {
    var matrix = [[1, 0, 0], [0, factor, 0], [0, 0, 1]];
    return matrix;
}
/** Scalation Matrix in z-direction */
function scaleZ(factor) {
    var matrix = [[1, 0, 0], [0, 1, 0], [0, 0 ,factor]];
    return matrix;
}








function computeCompositeTransformations(frames, transformation1, transformation2, start1, end1, start2, end2, initialVec, frameSize, arrowColor, color1, color2,point=[0,0,0]) {

    var intermediate1 = numeric.linspace(start1, end1, frameSize);
    var intermediate2 = numeric.linspace(start2, end2, frameSize);
    var trace1 = [initialVec];
    var firstTrace;
    var newLine;
    var afterImage = new Line([[0,0,0], point]);

    var newVec, newVec2;
    for (var i = 0, n = intermediate1.length; i < n; ++i) {
        newVec = math.multiply(transformation1(intermediate1[i]), initialVec);
        trace1.push(newVec);
        newLine = new Line([[0,0,0], newVec]);
        firstTrace = new Line(trace1);
        frames.push({
            data:[
                afterImage.gObject("#ffffff"),
                afterImage.arrowHead("#ffffff"),
                newLine.gObject(arrowColor),
                newLine.arrowHead(arrowColor),
                firstTrace.gObject(color1),
                new Line([[0, 0, 0], [0, 0, 0]]).gObject()
            ]
        });
    }

    var trace2 = [newVec];
    for (var i = 1, n = intermediate2.length; i < n; ++i) {
        newVec2 = math.multiply(transformation2(intermediate2[i]), newVec);
        trace2.push(newVec2);
        newLine = new Line([[0,0,0], newVec2]);
        frames.push({
            data:[
                afterImage.gObject("#ffffff"),
                afterImage.arrowHead("#ffffff"),
                newLine.gObject(arrowColor),
                newLine.arrowHead(arrowColor),
                new Line(trace2).gObject(color2),
                firstTrace.gObject(color1)
            ]
        });
    }
    return newVec2;
}
function computeCommute(transformation1, transformation2,start1, end1, start2, end2,  frameSize) {
    var frames = [];
    var newVec = computeCompositeTransformations(frames,
        transformation1, transformation2,
        start1, end1, start2, end2,
        initialVec, frameSize,
        white, "#0091D4", "#EC7300"
    );

    computeCompositeTransformations(frames,
        transformation2, transformation1,
        start2, end2, start1, end1,
        initialVec, frameSize,
        black, "#EC7300", "#0091D4",
        newVec
    );

    return frames;
}



/** It enable undo and reset buttons. */
function enableUndoReset() {
    $("#undo").prop("disabled",false);
    $("#reset").prop("disabled",false);
}


/**
 * It plots the index-th vector in the historyVectors.
 * @param {int} index - index of historyVectors.
 */
function initPlot() {
    var data = [];

    var initVec = new Line([[0,0,0], initialVec]);
    data.push(initVec.gObject("#000000"));
    data.push(initVec.arrowHead("#000000"));

    data.push(sphere);
    data = data.concat(axes);



    Plotly.plot(
        "graph",
        {data: data, layout: layout}
    );
}



/** It creates rotations animation frames */
function animateCommute() {
    var transformation1;
    var transformation2;
    var transformationSelector1 = document.getElementById('TransformationSelector1').value;
    var transformationSelector2 = document.getElementById('TransformationSelector2').value;
    var frameSize = 20;
    var extra = axes.slice();
    extra.push(sphere);

    if (transformationSelector1==="Rotation1"){

        var rotateAxis = document.getElementById('TransformationRelative1').value
        var slider = document.getElementById("rotator1").value;
        var start1 = 0;
        var end1 = slider * Math.PI;

        if (rotateAxis === "X") {
            transformation1 = rotationX;
        } else if (rotateAxis === "Y") {
            transformation1 = rotationY;
        } else if (rotateAxis === "Z") {
           transformation1 = rotationZ;
        }
    }else if (transformationSelector1 ==="Reflection1"){
        var plane = document.getElementById("TransformationRelative1").value;
        var start1 = 1.0;
        var end1 = -1.0;


        if (plane === "X") {
            transformation1 = scaleX;
            extra.push({
            x: [0, 0],
            y: [-4, 4],
            z: [[-4, 4],
                [-4, 4]],
            colorscale: [[0.0, "#608bbf"], [1.0, "#ffffff"]],
            opacity: 0.5,
            showscale: false,
            type: "surface"
        })
        } else if (plane === "Y") {
            transformation1 = scaleY;
            extra.push({
            x: [-4, 4],
            y: [0, 0],
            z: [[-4, -4],
                [4, 4]],
            colorscale: [[0.0, "#f7fcfb"], [1.0, "#f7fcfb"]],
            opacity: 0.5,
            showscale: false,
            type: "surface"
        })
        } else if (plane === "Z") {
            transformation1 = scaleZ;
            extra.push({
            x: [-4, 4],
            y: [-4, 4],
            z: [[0, 0],
                [0, 0]],
            colorscale: [[0.0, "#608bbf"], [1.0, "#ffffff"]],
            opacity: 0.5,
            showscale: false,
            type: "surface"
        })
        }


     }


    if (transformationSelector2 ==="Rotation2"){

        var rotateAxis = document.getElementById('TransformationRelative2').value
        var slider = document.getElementById("rotator2").value;
        var start2 = 0;
        var end2 = slider * Math.PI;

        if (rotateAxis === "X") {
            transformation2 = rotationX;
        } else if (rotateAxis === "Y") {
            transformation2 = rotationY;
        } else if (rotateAxis === "Z") {
            transformation2 = rotationZ;
        }
    }else if (transformationSelector2 ==="Reflection2"){
        var plane = document.getElementById('TransformationRelative2').value;
        var start2 = 1.0;
        var end2 = -1.0;


        if (plane === "X") {
            transformation2 = scaleX;
            extra.push({
            x: [0, 0],
            y: [-4, 4],
            z: [[-4, 4],
                [-4, 4]],
            colorscale: [[0.0, "#608bbf"], [1.0, "#ffffff"]],
            opacity: 0.5,
            showscale: false,
            type: "surface"
        })
        } else if (plane === "Y") {
            transformation2 = scaleY;
            extra.push({
            x: [-4, 4],
            y: [0, 0],
            z: [[-4, -4],
                [4, 4]],
            colorscale: [[0.0, "#608bbf"], [1.0, "#ffffff"]],
            opacity: 0.5,
            showscale: false,
            type: "surface"
        })
        } else if (plane === "Z") {
            transformation2 = scaleZ;
            extra.push({
            x: [-4, 4],
            y: [-4, 4],
            z: [[0, 0],
                [0, 0]],
            colorscale: [[0.0, "#608bbf"], [1.0, "#ffffff"]],
            opacity: 0.5,
            showscale: false,
            type: "surface"
        })
        }


     }
    var frames = computeCommute(transformation1, transformation2,start1, end1, start2, end2,frameSize)

    enableUndoReset();

    initAnimation("commuteAnimate", frames, extra, layout);
    startAnimation();
    return frames;

}

function checkCommute(){
    var transformationSelector1 = document.getElementById('TransformationSelector1').value;
    var transformationSelector2 = document.getElementById('TransformationSelector2').value;
    var rotateAxis1 = document.getElementById('TransformationRelative1').value
    var rotateAxis2 = document.getElementById('TransformationRelative2').value
    if (transformationSelector1==="Rotation1"){
        if(transformationSelector2==="Rotation2"){

            if (rotateAxis1 === rotateAxis2){
                $("#determinecommute").html('do');
                $("#determinecommute").css('color', 'green');
            }else{
                $("#determinecommute").html('do not');
                $("#determinecommute").css('color', 'red');
            }
        }else{
            $("#determinecommute").html('do not');
            $("#determinecommute").css('color', 'red');
        }
    }else if(transformationSelector1==="Reflection1"){
        if(transformationSelector2==="Reflection2"){
            $("#determinecommute").html('do');
            $("#determinecommute").css('color', 'green');
        }else if (transformationSelector2==="Rotation2"){
            if (rotateAxis1 === rotateAxis2){
                $("#determinecommute").html('do');
                $("#determinecommute").css('color', 'green');
            }else{
                $("#determinecommute").html('do not');
                $("#determinecommute").css('color', 'red');
            }
        }
    }
}



function main() {
    //Sliders
    $("#TransformationSelector1").on("change",function(){
        checkCommute();
            if($("#TransformationSelector1").val()==="Reflection1"){
                $("#slider1").hide();
            }else{
                $("#slider1").show();
            }
        
    });
    $("#TransformationSelector2").on("change",function(){
        checkCommute();
        if($("#TransformationSelector2").val()==="Reflection2"){
            $("#slider2").hide();
        }else{
            $("#slider2").show();
        }
    
});

    $("input[type=range]").each(function () {
        let displayEl;
        $(this).on('input', function(){
            checkCommute();
            $("#"+$(this).attr("id") + "Display").text( $(this).val() + $("#"+$(this).attr("id") + "Display").attr("data-unit") );
            $("#"+$(this).attr("id") + "DisplayA2").text( parseFloat($(this).val())*180 + $("#" + $(this).attr("id") + "DisplayA2").attr("data-unit") );

            if (parseFloat($(this).val())*8 % 8 === 0.0) {displayEl = $(this).val();
            } else if (parseFloat($(this).val())*8 % 4 === 0.0) {displayEl = "(" + $(this).val()*2 + "/2)";
            } else if (parseFloat($(this).val())*8 % 2 === 0.0) {displayEl = "(" + $(this).val()*4 + "/4)";
            } else {displayEl = "(" + $(this).val()*8 + "/8)";
            }
            $("#"+$(this).attr("id") + "DisplayA1").text( displayEl + $("#"+$(this).attr("id") + "DisplayA1").attr("data-unit"));


        });

    });

    //Tab


    $("input[type=submit]").click(function () {
        checkCommute();
        //log(this);
        var idName = $(this).attr("id");
        if (idName === "commuteAnimate") {
           animateCommute();
        }
        });

    $("input[type=submit]").click(function () {
        checkCommute();
     var idName = $(this).attr("id");
     if (idName === "reset"){
            Plotly.purge("graph");
            initPlot();
        }
    });




    //Initialisation
    initPlot();
}
$(document).ready(main);