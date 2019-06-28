function main() {
  $("input[type=range]").each(function () {
    $(this).on('input', function(){
          $("#"+$(this).attr("id") + "Display").text(  $(this).val() + $("#"+$(this).attr("id")+"Display").attr("data-unit")  );
    });
  });
}

//This defines the rotation matrices about the axes, takes in a point and an angle, and return a transformed point
function roXaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                [0, Math.cos(theta), -Math.sin(theta)],
                [0, Math.sin(theta), Math.cos(theta)]
                ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }
function roYaxis(point, theta) {
    var pointVec = point;
    var M = [[Math.cos(theta), 0, Math.sin(theta)],
                   [0, 1, 0],
                   [-Math.sin(theta), 0, Math.cos(theta)]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }
function roZaxis(point, theta) {
    var pointVec = point;
    var M = [[Math.cos(theta), -Math.sin(theta), 0],
                   [Math.sin(theta), Math.cos(theta), 0],
                   [0, 0 ,1]
                  ]
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

//This defines the skew matrices (also are called shear matrices) about the axes, takes in a point and an angle, and return a transformed point
function skewXaxis(point, theta) {
    var pointVec = point;
    var M = [[1, Math.tan(theta), 0],
                   [0, 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }
function skewYaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [Math.tan(theta), 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }
function skewZaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, 1, 0],
                   [0, Math.tan(theta) ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }



//6 new skew matrices!!!!!
function skewXaxisRelYaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [Math.tan(theta), 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function skewXaxisRelZaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, 1, 0],
                   [Math.tan(theta), 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function skewYaxisRelXaxis(point, theta) {
    var pointVec = point;
    var M = [[1, Math.tan(theta), 0],
                   [0, 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function skewYaxisRelZaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, 1, 0],
                   [0, Math.tan(theta) ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function skewZaxisRelXaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, Math.tan(theta)],
                   [0, 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function skewZaxisRelYaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, 1, Math.tan(theta)],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }



//This defines the scale matrices (also are called shear matrices) about the axes, takes in a point and an scale, and return a transformed point
function scaleallaxis(point, scale) {
    var pointVec = point;
    var M = [[scale, 0, 0],
                   [0, scale, 0],
                   [0, 0 ,scale]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }
function scaleXaxis(point, scale) {
    var pointVec = point;
    var M = [[scale, 0, 0],
                   [0, 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }
function scaleYaxis(point, scale) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, scale, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }
function scaleZaxis(point, scale) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, 1, 0],
                   [0, 0 ,scale]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }


//This is the master function, which takes in a transformation function, inital and final parameters to transform about, and the inital points of the cube
function master(transformation, initalparam, finalparam,xinit1,yinit1,zinit1){
    t = numeric.linspace(initalparam,finalparam  ,10); //The linspace to generate the intermediate points
    frames = []

    for (var i = 0 ; i < t.length ; i++) { //This loops through the linspace
        xrot1 = []
        yrot1 = []
        zrot1 = []

        var point, pointOut;
        for (var j = 0 ; j < 8 ; j++) {  //This is to loop through 8 points of the cube
            point = [xinit1[j],yinit1[j],zinit1[j]];
            pointOut = transformation(point,t[i]);
            if (math.max(pointOut) > 3){
                xrot1 = xinit1
                yrot1 = yinit1
                zrot1 = zinit1
                alert("you've overshot the layout!")
                return;
            } else {
            xrot1.push(pointOut[0]);
            yrot1.push(pointOut[1]);
            zrot1.push(pointOut[2]);
            }
        }

        cubeRotation = [{  //This generates the cube
        type: "mesh3d",
        x: xrot1,
        y: yrot1,
        z: zrot1,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
        colorscale: [
          [0, 'rgb(255,255,255)'],
          [0.5, 'rgb(0,133,202)'],
          [1, 'rgbrgb(0,62,116)']
        ],
        opacity: 0.6,
        showscale: false
        }]
        ;
        name = 'frame' + i;
        frames.push({
          "name": name,
          "data": cubeRotation
          }
        )
    }
    return frames;
}

//This is to make the graph reset
function graphReset(where){
    rotateTable.rows[0].cells[0].innerHTML = 1
    rotateTable.rows[0].cells[1].innerHTML = 0
    rotateTable.rows[0].cells[2].innerHTML = 0
    rotateTable.rows[1].cells[0].innerHTML = 0
    rotateTable.rows[1].cells[1].innerHTML = 1
    rotateTable.rows[1].cells[2].innerHTML = 0
    rotateTable.rows[2].cells[0].innerHTML = 0
    rotateTable.rows[2].cells[1].innerHTML = 0
    rotateTable.rows[2].cells[2].innerHTML = 1

    xrot1 = [-1., -1., 1., 1., -1., -1., 1., 1.];
    yrot1 = [-1., 1., 1., -1., -1., 1., 1., -1.];
    zrot1 = [-1., -1., -1., -1., 1., 1., 1., 1.];

    what = [{
        type: "mesh3d",
        x: xrot1,
        y: yrot1,
        z: zrot1,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
        colorscale: [
          [0, 'rgb(255,255,255)'],
          [0.5, 'rgb(0,133,202)'],
          [1, 'rgb(0,62,116)']
        ],
        opacity: 0.6,
        showscale: false
        }]

    Plotly.newPlot(where, what, layout )
}
function graphThat(xx, yy, zz,){

    what = [{
        type: "mesh3d",
        x: xx,
        y: yy,
        z: zz,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
        colorscale: [
          [0, 'rgb(255,255,255)'],
          [0.5, 'rgb(0,133,202)'],
          [1, 'rgb(0,62,116)']
        ],
        showscale: false
        }]
    layout = {
  scene:{
	 aspectmode: "manual",
   aspectratio: {
     x: 1, y: 1, z: 1,
    },
   xaxis: {
    range: [-3, 3],
  },
   yaxis: {
    range: [-3, 3],
  },
   zaxis: {
   range: [-3, 3],
  }},
};
    Plotly.newPlot('graph', what, layout )
}


//These functions take in the values from the HTML sliders, and use them as the parameters in the "master function" and then plots it
function Rotate(){
    axisSelector = document.getElementById("RotateSelect").value
    angleSelector = document.getElementById("RotateSlider").value
    angle = angleSelector*Math.PI
    if (axisSelector ==="RotXaxis") {
        framesnew = master(roXaxis,0,angle,xrot1,yrot1,zrot1)

        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);


    } else if (axisSelector === "RotYaxis") {
        framesnew = master(roYaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);


    } else if (axisSelector === "RotZaxis") {
        framesnew = master(roZaxis,0,angle,xrot1,yrot1,zrot1)

        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);

    }

}

function Scale(){
    axisSelector = document.getElementById("ScaleSelect").value
    scaleSelector = document.getElementById("ScaleSlider").value

    if (axisSelector ==="ScaleXaxis") {
        framesnew = master(scaleXaxis,1,scaleSelector,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
    } else if (axisSelector === "ScaleYaxis") {
        scaleTotalY = scaleTotalY*scaleSelector
        framesnew = master(scaleYaxis,1,scaleSelector,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);

    } else if (axisSelector === "ScaleZaxis") {
        framesnew = master(scaleZaxis ,1,scaleSelector,xrot1,yrot1,zrot1)
        scaleTotalZ = scaleTotalZ*scaleSelector
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
    }
}

function Skew(){
    axisSelector = document.getElementById("SkewSelect").value
    angleSelector = document.getElementById("SkewSlider").value
    relSelector = document.getElementById("SkewRelative").value
    angle = angleSelector*Math.PI
    if (axisSelector ==="SkewXaxis") {
        if (relSelector ==="Y"){
        framesnew = master(skewXaxisRelYaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        }

        else if (relSelector ==="Z"){
        framesnew = master(skewXaxisRelZaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        }
    } else if (axisSelector === "SkewYaxis") {
        if (relSelector ==="X"){
        framesnew = master(skewYaxisRelXaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        }

        else if (relSelector ==="Z"){
        framesnew = master(skewYaxisRelZaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        }

    } else if (axisSelector === "SkewZaxis") {
                if (relSelector ==="X"){
        framesnew = master(skewZaxisRelXaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        }

        else if (relSelector ==="Y"){
        framesnew = master(skewZaxisRelYaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        }
    }
}


//These functions are to display dynamically changing transformation matrices
function rotatematrix(){
    axisSelector = document.getElementById("RotateSelect").value
    angleSelector = document.getElementById("RotateSlider").value
    angle = angleSelector*Math.PI

    if (axisSelector ==="RotXaxis") {
    rotateTable.rows[1].cells[0].innerHTML =+ Math.round((rotateTable.rows[1].cells[0].innerHTML*Math.cos(angle) - rotateTable.rows[2].cells[0].innerHTML*Math.sin(angle))*100)/100 //0
    rotateTable.rows[1].cells[1].innerHTML =+ Math.round((rotateTable.rows[1].cells[1].innerHTML*Math.cos(angle) - rotateTable.rows[2].cells[1].innerHTML*Math.sin(angle))*100)/100 //"cos(" + angleSelector + "π)"
    rotateTable.rows[1].cells[2].innerHTML =+ Math.round((rotateTable.rows[1].cells[2].innerHTML*Math.cos(angle) - rotateTable.rows[2].cells[2].innerHTML*Math.sin(angle))*100)/100 //"-sin(" + angleSelector + "π)"
    rotateTable.rows[2].cells[0].innerHTML =+ Math.round((rotateTable.rows[2].cells[0].innerHTML*Math.cos(angle) + rotateTable.rows[1].cells[0].innerHTML*Math.sin(angle))*100)/100 //0
    rotateTable.rows[2].cells[1].innerHTML =+ Math.round((rotateTable.rows[2].cells[1].innerHTML*Math.cos(angle) + rotateTable.rows[1].cells[1].innerHTML*Math.sin(angle))*100)/100 //"sin(" + angleSelector + "π)"
    rotateTable.rows[2].cells[2].innerHTML =+ Math.round((rotateTable.rows[2].cells[2].innerHTML*Math.cos(angle) + rotateTable.rows[1].cells[2].innerHTML*Math.sin(angle))*100)/100//"cos(" + angleSelector + "π)"



    } else if (axisSelector === "RotYaxis") {
    rotateTable.rows[0].cells[0].innerHTML =+ Math.round((rotateTable.rows[0].cells[0].innerHTML*Math.cos(angle) + rotateTable.rows[2].cells[0].innerHTML*Math.sin(angle))*100)/100//"cos(" + angleSelector + "π)"
    rotateTable.rows[0].cells[1].innerHTML =+ Math.round((rotateTable.rows[0].cells[1].innerHTML*Math.cos(angle) + rotateTable.rows[2].cells[0].innerHTML*Math.sin(angle))*100)/100//0
    rotateTable.rows[0].cells[2].innerHTML =+ Math.round((rotateTable.rows[0].cells[2].innerHTML*Math.cos(angle) + rotateTable.rows[2].cells[0].innerHTML*Math.sin(angle))*100)/100//"sin(" + angleSelector + "π)"
    rotateTable.rows[2].cells[0].innerHTML =+ Math.round((rotateTable.rows[2].cells[0].innerHTML*Math.cos(angle) - rotateTable.rows[0].cells[0].innerHTML*Math.sin(angle))*100)/100//"-sin(" + angleSelector + "π)"
    rotateTable.rows[2].cells[1].innerHTML =+ Math.round((rotateTable.rows[2].cells[1].innerHTML*Math.cos(angle) - rotateTable.rows[0].cells[1].innerHTML*Math.sin(angle))*100)/100//0
    rotateTable.rows[2].cells[2].innerHTML =+ Math.round((rotateTable.rows[2].cells[2].innerHTML*Math.cos(angle) - rotateTable.rows[0].cells[2].innerHTML*Math.sin(angle))*100)/100//"cos(" + angleSelector + "π)"

    } else if (axisSelector === "RotZaxis") {
    rotateTable.rows[0].cells[0].innerHTML =+ Math.round((rotateTable.rows[0].cells[0].innerHTML*Math.cos(angle) - rotateTable.rows[1].cells[0].innerHTML*Math.sin(angle))*100)/100//"cos(" + angleSelector + "π)"
    rotateTable.rows[0].cells[1].innerHTML =+ Math.round((rotateTable.rows[0].cells[1].innerHTML*Math.cos(angle) - rotateTable.rows[1].cells[1].innerHTML*Math.sin(angle))*100)/100//"-sin(" + angleSelector + "π)"
    rotateTable.rows[0].cells[2].innerHTML =+ Math.round((rotateTable.rows[0].cells[2].innerHTML*Math.cos(angle) - rotateTable.rows[1].cells[2].innerHTML*Math.sin(angle))*100)/100//0
    rotateTable.rows[1].cells[0].innerHTML =+ Math.round((rotateTable.rows[1].cells[0].innerHTML*Math.cos(angle) + rotateTable.rows[0].cells[0].innerHTML*Math.sin(angle))*100)/100//"sin(" + angleSelector + "π)"
    rotateTable.rows[1].cells[1].innerHTML =+ Math.round((rotateTable.rows[1].cells[1].innerHTML*Math.cos(angle) + rotateTable.rows[0].cells[1].innerHTML*Math.sin(angle))*100)/100//"cos(" + angleSelector + "π)"
    rotateTable.rows[1].cells[2].innerHTML =+ Math.round((rotateTable.rows[1].cells[2].innerHTML*Math.cos(angle) + rotateTable.rows[0].cells[2].innerHTML*Math.sin(angle))*100)/100//0

    }

}
function skewmatrix(){
    axisSelector = document.getElementById("SkewSelect").value
    angleSelector = document.getElementById("SkewSlider").value
    skewSelector = document.getElementById("SkewRelative").value
    angle = angleSelector*Math.PI

    if (axisSelector ==="SkewXaxis") {
        if (skewSelector === "Y"){
          rotateTable.rows[1].cells[0].innerHTML =+ Math.round((rotateTable.rows[1].cells[0].innerHTML*1.0 + rotateTable.rows[0].cells[0].innerHTML*Math.tan(angle))*100)/100 //1
          rotateTable.rows[1].cells[1].innerHTML =+ Math.round((rotateTable.rows[1].cells[1].innerHTML*1.0 + rotateTable.rows[0].cells[1].innerHTML*Math.tan(angle))*100)/100//"tan(" + angleSelector + "π)"
          rotateTable.rows[1].cells[2].innerHTML =+ Math.round((rotateTable.rows[1].cells[2].innerHTML*1.0 + rotateTable.rows[0].cells[2].innerHTML*Math.tan(angle))*100)/100//0
        }

        else if(skewSelector === "Z"){
          rotateTable.rows[2].cells[0].innerHTML =+ Math.round((rotateTable.rows[2].cells[0].innerHTML*1.0 + rotateTable.rows[0].cells[0].innerHTML*Math.tan(angle))*100)/100 //1
          rotateTable.rows[2].cells[1].innerHTML =+ Math.round((rotateTable.rows[2].cells[1].innerHTML*1.0 + rotateTable.rows[0].cells[1].innerHTML*Math.tan(angle))*100)/100//"tan(" + angleSelector + "π)"
          rotateTable.rows[2].cells[2].innerHTML =+ Math.round((rotateTable.rows[2].cells[2].innerHTML*1.0 + rotateTable.rows[0].cells[2].innerHTML*Math.tan(angle))*100)/100//0
        }
    }

    else if (axisSelector ==="SkewYaxis") {
        if (skewSelector === "X"){
          rotateTable.rows[0].cells[0].innerHTML =+ Math.round((rotateTable.rows[0].cells[0].innerHTML*1.0 + rotateTable.rows[1].cells[0].innerHTML*Math.tan(angle))*100)/100 //1
          rotateTable.rows[0].cells[1].innerHTML =+ Math.round((rotateTable.rows[0].cells[1].innerHTML*1.0 + rotateTable.rows[1].cells[1].innerHTML*Math.tan(angle))*100)/100//"tan(" + angleSelector + "π)"
          rotateTable.rows[0].cells[2].innerHTML =+ Math.round((rotateTable.rows[0].cells[2].innerHTML*1.0 + rotateTable.rows[1].cells[2].innerHTML*Math.tan(angle))*100)/100//0
         }

        else if(skewSelector === "Z"){
          rotateTable.rows[2].cells[0].innerHTML =+ Math.round((rotateTable.rows[2].cells[0].innerHTML*1.0 + rotateTable.rows[1].cells[0].innerHTML*Math.tan(angle))*100)/100 //1
          rotateTable.rows[2].cells[1].innerHTML =+ Math.round((rotateTable.rows[2].cells[1].innerHTML*1.0 + rotateTable.rows[1].cells[1].innerHTML*Math.tan(angle))*100)/100//"tan(" + angleSelector + "π)"
          rotateTable.rows[2].cells[2].innerHTML =+ Math.round((rotateTable.rows[2].cells[2].innerHTML*1.0 + rotateTable.rows[1].cells[2].innerHTML*Math.tan(angle))*100)/100//0
        }
    }

    else if (axisSelector ==="SkewZaxis") {
        if (skewSelector === "X"){
          rotateTable.rows[0].cells[0].innerHTML =+ Math.round((rotateTable.rows[0].cells[0].innerHTML*1.0 + rotateTable.rows[2].cells[0].innerHTML*Math.tan(angle))*100)/100 //1
          rotateTable.rows[0].cells[1].innerHTML =+ Math.round((rotateTable.rows[0].cells[1].innerHTML*1.0 + rotateTable.rows[2].cells[1].innerHTML*Math.tan(angle))*100)/100//"tan(" + angleSelector + "π)"
          rotateTable.rows[0].cells[2].innerHTML =+ Math.round((rotateTable.rows[0].cells[2].innerHTML*1.0 + rotateTable.rows[2].cells[2].innerHTML*Math.tan(angle))*100)/100//0
         }

        else if(skewSelector === "Y"){
          rotateTable.rows[1].cells[0].innerHTML =+ Math.round((rotateTable.rows[1].cells[0].innerHTML*1.0 + rotateTable.rows[2].cells[0].innerHTML*Math.tan(angle))*100)/100 //1
          rotateTable.rows[1].cells[1].innerHTML =+ Math.round((rotateTable.rows[1].cells[1].innerHTML*1.0 + rotateTable.rows[2].cells[1].innerHTML*Math.tan(angle))*100)/100//"tan(" + angleSelector + "π)"
          rotateTable.rows[1].cells[2].innerHTML =+ Math.round((rotateTable.rows[1].cells[2].innerHTML*1.0 + rotateTable.rows[2].cells[2].innerHTML*Math.tan(angle))*100)/100//0
        }
    }


}
function scalematrix(){
    axisSelector = document.getElementById("ScaleSelect").value
    scaleSelector = document.getElementById("ScaleSlider").value
    angle = angleSelector*Math.PI

    if (axisSelector ==="ScaleXaxis") {
    rotateTable.rows[0].cells[0].innerHTML = Math.round((rotateTable.rows[0].cells[0].innerHTML*1.0 + rotateTable.rows[0].cells[0].innerHTML*(scaleSelector-1))*100)/100 //scaleSelector
    rotateTable.rows[0].cells[1].innerHTML = Math.round((rotateTable.rows[0].cells[1].innerHTML*1.0 + rotateTable.rows[0].cells[1].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[0].cells[2].innerHTML = Math.round((rotateTable.rows[0].cells[2].innerHTML*1.0 + rotateTable.rows[0].cells[2].innerHTML*(scaleSelector-1))*100)/100//0

    } else if (axisSelector === "ScaleYaxis") {
    rotateTable.rows[1].cells[0].innerHTML = Math.round((rotateTable.rows[1].cells[0].innerHTML*1.0 + rotateTable.rows[1].cells[0].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[1].cells[1].innerHTML = Math.round((rotateTable.rows[1].cells[1].innerHTML*1.0 + rotateTable.rows[1].cells[1].innerHTML*(scaleSelector-1))*100)/100//scaleSelector
    rotateTable.rows[1].cells[2].innerHTML = Math.round((rotateTable.rows[1].cells[2].innerHTML*1.0 + rotateTable.rows[1].cells[2].innerHTML*(scaleSelector-1))*100)/100//0

    } else if (axisSelector === "ScaleZaxis") {
    rotateTable.rows[2].cells[0].innerHTML = Math.round((rotateTable.rows[2].cells[0].innerHTML*1.0 + rotateTable.rows[2].cells[0].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[2].cells[1].innerHTML = Math.round((rotateTable.rows[2].cells[1].innerHTML*1.0 + rotateTable.rows[2].cells[1].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[2].cells[2].innerHTML = Math.round((rotateTable.rows[2].cells[2].innerHTML*1.0 + rotateTable.rows[2].cells[2].innerHTML*(scaleSelector-1))*100)/100//scaleSelector

    } else if (axisSelector === "ScaleAllaxis") {
    rotateTable.rows[0].cells[0].innerHTML = Math.round((rotateTable.rows[0].cells[0].innerHTML*1.0 + rotateTable.rows[0].cells[0].innerHTML*(scaleSelector-1))*100)/100//scaleSelector
    rotateTable.rows[0].cells[1].innerHTML = Math.round((rotateTable.rows[0].cells[1].innerHTML*1.0 + rotateTable.rows[0].cells[1].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[0].cells[2].innerHTML = Math.round((rotateTable.rows[0].cells[2].innerHTML*1.0 + rotateTable.rows[0].cells[2].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[1].cells[0].innerHTML = Math.round((rotateTable.rows[1].cells[0].innerHTML*1.0 + rotateTable.rows[1].cells[0].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[1].cells[1].innerHTML = Math.round((rotateTable.rows[1].cells[1].innerHTML*1.0 + rotateTable.rows[1].cells[1].innerHTML*(scaleSelector-1))*100)/100//scaleSelector
    rotateTable.rows[1].cells[2].innerHTML = Math.round((rotateTable.rows[1].cells[2].innerHTML*1.0 + rotateTable.rows[1].cells[2].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[2].cells[0].innerHTML = Math.round((rotateTable.rows[2].cells[0].innerHTML*1.0 + rotateTable.rows[2].cells[0].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[2].cells[1].innerHTML = Math.round((rotateTable.rows[2].cells[1].innerHTML*1.0 + rotateTable.rows[2].cells[1].innerHTML*(scaleSelector-1))*100)/100//0
    rotateTable.rows[2].cells[2].innerHTML = Math.round((rotateTable.rows[2].cells[2].innerHTML*1.0 + rotateTable.rows[2].cells[2].innerHTML*(scaleSelector-1))*100)/100//scaleSelector
    }
}


function rotatematrix1(){

    axisSelector = document.getElementById("RotateSelect").value
    angleSelector = document.getElementById("RotateSlider").value
    angle = angleSelector*Math.PI


    if (axisSelector ==="RotXaxis") {
    rotateTable1.rows[0].cells[0].innerHTML = 1
    rotateTable1.rows[0].cells[1].innerHTML = 0
    rotateTable1.rows[0].cells[2].innerHTML = 0
    rotateTable1.rows[1].cells[0].innerHTML = 0
    rotateTable1.rows[1].cells[1].innerHTML = "cos(" + angleSelector + "π)"
    rotateTable1.rows[1].cells[2].innerHTML = "-sin(" + angleSelector + "π)"
    rotateTable1.rows[2].cells[0].innerHTML = 0
    rotateTable1.rows[2].cells[1].innerHTML = "sin(" + angleSelector + "π)"
    rotateTable1.rows[2].cells[2].innerHTML = "cos(" + angleSelector + "π)"



    } else if (axisSelector === "RotYaxis") {
    rotateTable1.rows[0].cells[0].innerHTML = "cos(" + angleSelector + "π)"
    rotateTable1.rows[0].cells[1].innerHTML = 0
    rotateTable1.rows[0].cells[2].innerHTML = "sin(" + angleSelector + "π)"
    rotateTable1.rows[1].cells[0].innerHTML = 0
    rotateTable1.rows[1].cells[1].innerHTML = 1
    rotateTable1.rows[1].cells[2].innerHTML = 0
    rotateTable1.rows[2].cells[0].innerHTML = "-sin(" + angleSelector + "π)"
    rotateTable1.rows[2].cells[1].innerHTML = 0
    rotateTable1.rows[2].cells[2].innerHTML = "cos(" + angleSelector + "π)"

    } else if (axisSelector === "RotZaxis"){
    rotateTable1.rows[0].cells[0].innerHTML = "cos(" + angleSelector + "π)"
    rotateTable1.rows[0].cells[1].innerHTML = "-sin(" + angleSelector + "π)"
    rotateTable1.rows[0].cells[2].innerHTML = 0
    rotateTable1.rows[1].cells[0].innerHTML = "sin(" + angleSelector + "π)"
    rotateTable1.rows[1].cells[1].innerHTML = "cos(" + angleSelector + "π)"
    rotateTable1.rows[1].cells[2].innerHTML = 0
    rotateTable1.rows[2].cells[0].innerHTML = 0
    rotateTable1.rows[2].cells[1].innerHTML = 0
    rotateTable1.rows[2].cells[2].innerHTML = 1

    }

}
function skewmatrix1(){
    axisSelector = document.getElementById("SkewSelect").value
    angleSelector = document.getElementById("SkewSlider").value
    skewSelector = document.getElementById("SkewRelative").value
    angle = angleSelector*Math.PI

    if (axisSelector ==="SkewXaxis") {
        if (skewSelector === "Y"){
          rotateTable1.rows[0].cells[0].innerHTML = 1
          rotateTable1.rows[0].cells[1].innerHTML = 0
          rotateTable1.rows[0].cells[2].innerHTML = 0
          rotateTable1.rows[1].cells[0].innerHTML = "tan(" + angleSelector + "π)"
          rotateTable1.rows[1].cells[1].innerHTML = 1
          rotateTable1.rows[1].cells[2].innerHTML = 0
          rotateTable1.rows[2].cells[0].innerHTML = 0
          rotateTable1.rows[2].cells[1].innerHTML = 0
          rotateTable1.rows[2].cells[2].innerHTML = 1
        }

        else if(skewSelector === "Z"){
          rotateTable1.rows[0].cells[0].innerHTML = 1
          rotateTable1.rows[0].cells[1].innerHTML = 0
          rotateTable1.rows[0].cells[2].innerHTML = 0
          rotateTable1.rows[1].cells[0].innerHTML = 0
          rotateTable1.rows[1].cells[1].innerHTML = 1
          rotateTable1.rows[1].cells[2].innerHTML = 0
          rotateTable1.rows[2].cells[0].innerHTML = "tan(" + angleSelector + "π)"
          rotateTable1.rows[2].cells[1].innerHTML = 0
          rotateTable1.rows[2].cells[2].innerHTML = 1
        }
    }

    else if (axisSelector ==="SkewYaxis") {
        if (skewSelector === "X"){
          rotateTable1.rows[0].cells[0].innerHTML = 1
          rotateTable1.rows[0].cells[1].innerHTML = "tan(" + angleSelector + "π)"
          rotateTable1.rows[0].cells[2].innerHTML = 0
          rotateTable1.rows[1].cells[0].innerHTML = 0
          rotateTable1.rows[1].cells[1].innerHTML = 1
          rotateTable1.rows[1].cells[2].innerHTML = 0
          rotateTable1.rows[2].cells[0].innerHTML = 0
          rotateTable1.rows[2].cells[1].innerHTML = 0
          rotateTable1.rows[2].cells[2].innerHTML = 1
         }

        else if(skewSelector === "Z"){
          rotateTable1.rows[0].cells[0].innerHTML = 1
          rotateTable1.rows[0].cells[1].innerHTML = 0
          rotateTable1.rows[0].cells[2].innerHTML = 0
          rotateTable1.rows[1].cells[0].innerHTML = 0
          rotateTable1.rows[1].cells[1].innerHTML = 1
          rotateTable1.rows[1].cells[2].innerHTML = 0
          rotateTable1.rows[2].cells[0].innerHTML = 0
          rotateTable1.rows[2].cells[1].innerHTML = "tan(" + angleSelector + "π)"
          rotateTable1.rows[2].cells[2].innerHTML = 1
        }
    }

    else if (axisSelector ==="SkewZaxis") {
        if (skewSelector === "X"){
          rotateTable1.rows[0].cells[0].innerHTML = 1
          rotateTable1.rows[0].cells[1].innerHTML = 0
          rotateTable1.rows[0].cells[2].innerHTML = "tan(" + angleSelector + "π)"
          rotateTable1.rows[1].cells[0].innerHTML = 0
          rotateTable1.rows[1].cells[1].innerHTML = 1
          rotateTable1.rows[1].cells[2].innerHTML = 0
          rotateTable1.rows[2].cells[0].innerHTML = 0
          rotateTable1.rows[2].cells[1].innerHTML = 0
          rotateTable1.rows[2].cells[2].innerHTML = 1
         }

        else if(skewSelector === "Y"){
          rotateTable1.rows[0].cells[0].innerHTML = 1
          rotateTable1.rows[0].cells[1].innerHTML = 0
          rotateTable1.rows[0].cells[2].innerHTML = 0
          rotateTable1.rows[1].cells[0].innerHTML = 0
          rotateTable1.rows[1].cells[1].innerHTML = 1
          rotateTable1.rows[1].cells[2].innerHTML = "tan(" + angleSelector + "π)"
          rotateTable1.rows[2].cells[0].innerHTML = 0
          rotateTable1.rows[2].cells[1].innerHTML = 0
          rotateTable1.rows[2].cells[2].innerHTML = 1
        }

    }

}
function scalematrix1(){
    angle = angleSelector*Math.PI
    axisSelector = document.getElementById("RotateSelect").value
    angleSelector = document.getElementById("RotateSlider").value

    axisSelector = document.getElementById("SkewSelect").value
    angleSelector = document.getElementById("SkewSlider").value
    axisSelector = document.getElementById("ScaleSelect").value
    scaleSelector = document.getElementById("ScaleSlider").value
    if (axisSelector ==="ScaleXaxis") {
    rotateTable1.rows[0].cells[0].innerHTML = scaleSelector
    rotateTable1.rows[0].cells[1].innerHTML = 0
    rotateTable1.rows[0].cells[2].innerHTML = 0
    rotateTable1.rows[1].cells[0].innerHTML = 0
    rotateTable1.rows[1].cells[1].innerHTML = 1
    rotateTable1.rows[1].cells[2].innerHTML = 0
    rotateTable1.rows[2].cells[0].innerHTML = 0
    rotateTable1.rows[2].cells[1].innerHTML = 0
    rotateTable1.rows[2].cells[2].innerHTML = 1

    } else if (axisSelector === "ScaleYaxis") {
    rotateTable1.rows[0].cells[0].innerHTML = 1
    rotateTable1.rows[0].cells[1].innerHTML = 0
    rotateTable1.rows[0].cells[2].innerHTML = 0
    rotateTable1.rows[1].cells[0].innerHTML = 0
    rotateTable1.rows[1].cells[1].innerHTML = scaleSelector
    rotateTable1.rows[1].cells[2].innerHTML = 0
    rotateTable1.rows[2].cells[0].innerHTML = 0
    rotateTable1.rows[2].cells[1].innerHTML = 0
    rotateTable1.rows[2].cells[2].innerHTML = 1



    } else if (axisSelector === "ScaleZaxis") {
    rotateTable1.rows[0].cells[0].innerHTML = 1
    rotateTable1.rows[0].cells[1].innerHTML = 0
    rotateTable1.rows[0].cells[2].innerHTML = 0
    rotateTable1.rows[1].cells[0].innerHTML = 0
    rotateTable1.rows[1].cells[1].innerHTML = 1
    rotateTable1.rows[1].cells[2].innerHTML = 0
    rotateTable1.rows[2].cells[0].innerHTML = 0
    rotateTable1.rows[2].cells[1].innerHTML = 0
    rotateTable1.rows[2].cells[2].innerHTML = scaleSelector

    }  else if (axisSelector === "ScaleAllaxis") {
    rotateTable1.rows[0].cells[0].innerHTML = scaleSelector
    rotateTable1.rows[0].cells[1].innerHTML = 0
    rotateTable1.rows[0].cells[2].innerHTML = 0
    rotateTable1.rows[1].cells[0].innerHTML = 0
    rotateTable1.rows[1].cells[1].innerHTML = scaleSelector
    rotateTable1.rows[1].cells[2].innerHTML = 0
    rotateTable1.rows[2].cells[0].innerHTML = 0
    rotateTable1.rows[2].cells[1].innerHTML = 0
    rotateTable1.rows[2].cells[2].innerHTML = scaleSelector



    }

}


//This function will hopefully generate a layout by the time you read this
function generateLayout(){
    xmax = math.max(xrot1) +3;
    ymax = math.max(yrot1) +3;
    zmax = math.max(zrot1) +3;
    xmin = math.min(xrot1) -3;
    ymin = math.min(yrot1) -3;
    zmin = math.min(zrot1) -3;


    lay = {
      scene:{
         aspectmode: "manual",
       aspectratio: {
         x: 1, y: 1, z: 1,
        },
       xaxis: {
        range: [xmin, xmax],
      },
       yaxis: {
        range: [ymin, ymax],
      },
       zaxis: {
       range: [zmin, zmax],
      }},
        margin:  {l: 0, r:0,t:0,b:0}
    };
    return lay
}


//All Initials
var axisSelector, angleSelector, angle, scaleSelector,framesnew, name, xmax, ymax, zmax, xmin, ymin, zmin, layout, cubeRotation, name;
var xx = [-1., -1., 1., 1., -1., -1., 1., 1.];
var yy = [-1., 1., 1., -1., -1., 1., 1., -1.];
var zz = [-1., -1., -1., -1., 1., 1., 1., 1.];


var data = [];
var initial = [{
    type: "mesh3d",
    x: xx,
    y: yy,
    z: zz,
    i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
    j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
    k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
    intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
    opacity: 0.6,
    colorscale: [
          [0, 'rgb(255,255,255)'],
          [0.5, 'rgb(0,133,202)'],
          [1, 'rgbrgb(0,62,116)']
        ],

    showscale: false
    }]
var data = [];
var scaleTotalX = 1
var scaleTotalY = 1
var scaleTotalZ = 1

var xrot1 = [-1., -1., 1., 1., -1., -1., 1., 1.];
var yrot1 = [-1., 1., 1., -1., -1., 1., 1., -1.];
var zrot1 = [-1., -1., -1., -1., 1., 1., 1., 1.];


layout = {
        autosize:true,
      scene:{
         aspectmode: "cube",
       aspectratio: {
         x: 1, y: 1, z: 1,
        },
        xaxis: {
          range: [-3.5,3.5]

      },
        yaxis: {
            range: [-3.5 , 3.5]
        },
        zaxis: {
            range: [-3.5,3.5]
        }
      },
        margin:  {l: 0, r:0,t:0,b:0}
    };
$(document).ready(main);
Plotly.newPlot('graph', initial, layout)


