$(document).ready(function () {
    // Now begins the maths Segment of the code
    //function that copies an array
    function copy(arr) {
        let new_arr = arr.slice(0);
        for (let i = new_arr.length; i--;)
            if (new_arr[i] instanceof Array)
                new_arr[i] = copy(new_arr[i]);
        return new_arr;
    };

    //calculates all the new data to be plotted using a transformation matrix and the probe's angle
    function calculate_positions_and_vectors(inputTheta, x1, y1, x2, y2) {
        let matrix = [[x1, y1], [x2, y2]];

        const rho = 15;

        let xArray = [];
        let yArray = [];

        let xArrayTrans = [];
        let yArrayTrans = [];

        //determine the eigenvectors:
        let xEigVector0 = numeric.eig(matrix).E.x[0][0];
        let yEigVector0 = numeric.eig(matrix).E.x[1][0];
        let theta0 = Math.atan2(yEigVector0, xEigVector0);

        let xEigVector1 = numeric.eig(matrix).E.x[0][1];
        let yEigVector1 = numeric.eig(matrix).E.x[1][1];
        let theta1 = Math.atan2(yEigVector1, xEigVector1);

        //generate points on the input line.
        let xInput = [];
        let yInput = [];
        let xInputTransformedArray = [];
        let yInputTransformedArray = [];

     

        let eigenvalue0 = 5 * math.round(numeric.eig(matrix).lambda.x[0] * 100) / 100;
        let eigenvalue1 = 5 * math.round(numeric.eig(matrix).lambda.x[1] * 100) / 100;
        let lineLength;
        if (eigenvalue0 >= eigenvalue1) {
            lineLength = eigenvalue0;
        } else {
            lineLength = eigenvalue1;
        }
        console.log(lineLength*1.2*rho/10)

        //defining input line:
        if (lineLength < rho) {
            lineLength = rho;
        }
        //generate eigenvector lines, line of input and transformed points.
        for (
            let x = -lineLength * 1.2;
            x < lineLength * 1.2 + 1.2;
            x += (lineLength * 1.2) / 10
        ) {
            for (
                let y = -lineLength * 1.2;
                y < lineLength * 1.2 + 1.2;
                y += (lineLength * 1.2) / 10
            ) {
                xArray.push(x);
                yArray.push(y);

                //transform and generate transArrays.
                let xTransformed = x1 * x + y1 * y;
                let yTransformed = x2 * x + y2 * y;

                xArrayTrans.push(xTransformed);
                yArrayTrans.push(yTransformed);
            }
        }
        let inputArray = numeric.linspace(-lineLength, lineLength, 10);

        for (let i = 0; i < inputArray.length; i++) {
            let x = inputArray[i] * Math.cos(inputTheta);
            let y = inputArray[i] * Math.sin(inputTheta);
            xInput.push(x);
            yInput.push(y);

            //transform and generate transArrays.
            xInputTransformed = x1 * x + y1 * y;
            yInputTransformed = x2 * x + y2 * y;

            xInputTransformedArray.push(xInputTransformed);
            yInputTransformedArray.push(yInputTransformed);
        }
        return ([xInput, yInput, xArray, yArray, lineLength, xInputTransformedArray, yInputTransformedArray, theta0, theta1, inputTheta, xArrayTrans, yArrayTrans]);
    }


    // Now begins the Interactivity Segment of the code

    // define constants related to animation time
    const animate_time = 10;
    const total_animate_time = 400;
    const t = animate_time / total_animate_time;
    let counter = 0;
    let ispaused = true;
    let animator;

    //define out jQuery objects
    let slider = $("#controller");
    let u00 = $("#Urow0col0");
    let u10 = $("#Urow1col0");
    let u01 = $("#Urow0col1");
    let u11 = $("#Urow1col1");
    let probetitle = $("#probetitle");
    let eigenbutton = $("#eigenbutton");

    //Layout object for plotly
    const layout = {
        autosize: true,
        margin: {
            l: 20,
            r: 20,
            t: 20,
            b: 20
        },
        hovermode: "closest",
        showlegend: true,
        legend: {
            orientation: "v",
            x:0,
            y:1,
        },
        xaxis: {
            constrain: 'domain',
            label: "x",
        },
        yaxis: {
            label: "y",
            scaleanchor: "x",
        },
    };

    //function takes all relevant vector and posisitions as inputs and uses plotly to create plots.
    function graph([xInput, yInput, xArray, yArray, lineLength, xInputTransformedArray, yInputTransformedArray, theta0, theta1, inputTheta, xArrayTrans, yArrayTrans]) {
        //define input matrix:
        let data = [
            {
                x: xArray,
                y: yArray,
                type: "scatter",
                opacity: "0.5",
                name: "General Positions",
                mode: "markers",
                hovertext: "2D array",
                marker: {
                    color: "#9D9D9D"
                }
            },
            {
                x: [-lineLength * math.cos(theta0), lineLength * math.cos(theta0)],
                y: [-lineLength * math.sin(theta0), lineLength * math.sin(theta0)],
                name: "Eigenvector 1",
                type: "scatter",
                mode: "lines",
                hovertext: "Eigenvector 1",
                marker: {
                    color: "#02893B",
                }
            },

            {
                x: [-lineLength * math.cos(theta1), lineLength * math.cos(theta1)],
                y: [-lineLength * math.sin(theta1), lineLength * math.sin(theta1)],
                name: "Eigenvector 2",
                type: "scatter",
                mode: "lines",
                hovertext: "Eigenvector 2",
                marker: {
                    color: "#EC7300",
                }
            },
            {
                x: [
                    -lineLength * math.cos(inputTheta),
                    lineLength * math.cos(inputTheta)
                ],
                y: [
                    -lineLength * math.sin(inputTheta),
                    lineLength * math.sin(inputTheta)
                ],
                name: "Probing line",
                type: "scatter",
                mode: "lines",
                marker: {
                    color: "#751E66"
                }
            },
            {
                x: xInput,
                y: yInput,
                type: "scatter",
                mode: "markers",
                name: "Probe Positions",
                hovertext: "Position vectors",
                marker: {
                    color: "0091D4"
                }
            }

        ];

        Plotly.react("graph", data, layout);
    }



    // function calls maths function using jQuery slider/input values, and uses these to plot the graphs
    function updatePlot() {
        customMatrix(u00.val(), u10.val(), u01.val(), u11.val());
        data_for_plotting = calculate_positions_and_vectors(slider.val(), u00.val(), u01.val(), u10.val(), u11.val());
        graph(data_for_plotting)

    }



    //Start animation is called when the apply transformation button is clicked. This function starts animating the point traces using native JS setInterval()

    function startAnimation() {
        // reset counter to 0 (restart animation)
        counter = 0;
        // calculate and define pre and post transformed data
        let data_for_plotting = calculate_positions_and_vectors(slider.val(), u00.val(), u01.val(), u10.val(), u11.val());
        const xInput = data_for_plotting[0];
        const yInput = data_for_plotting[1];
        const xArray = data_for_plotting[2];
        const yArray = data_for_plotting[3];
        const xInputTransformedArray = data_for_plotting[5];
        const yInputTransformedArray = data_for_plotting[6];
        const xArrayTrans = data_for_plotting[10];
        const yArrayTrans = data_for_plotting[11];
        // initialise the difference arrays, which are the difference between the before and after transformation data
        let xprobedifference = copy(xInput);
        let yprobedifference = copy(yInput);
        let xgeneraldifference = copy(xArray);
        let ygeneraldifference = copy(yArray);
        // fill the difference arrays with th
        for (let i = 0; i < xInput.length; i++) {
            xprobedifference[i] = xInputTransformedArray[i] - xInput[i];
            yprobedifference[i] = yInputTransformedArray[i] - yInput[i];
        }
        for (let i = 0; i < xArray.length; i++) {
            xgeneraldifference[i] = xArrayTrans[i] - xArray[i];
            ygeneraldifference[i] = yArrayTrans[i] - yArray[i];
        }
        animator = setInterval(Animate, animate_time, xInput, yInput, xprobedifference, yprobedifference, xArray, yArray, xgeneraldifference, ygeneraldifference);
    };


    function Animate(xprobe, yprobe, xdiff_probe, ydiff_probe, xarrayall, yarrayall, xdiff_general, ydiff_general) {
        if (!ispaused) {
            for (let i = 0; i < xprobe.length; i++) {
                xprobe[i] += t * xdiff_probe[i];
                yprobe[i] += t * ydiff_probe[i];
            }
            for (let i = 0; i < xarrayall.length; i++) {
                xarrayall[i] += t * xdiff_general[i];
                yarrayall[i] += t * ydiff_general[i];
            }

            Plotly.restyle("graph", {
                x: [xarrayall, xprobe],
                y: [yarrayall, yprobe],
            }, [0, 4]);

            counter += t
            if (counter >= 1) {
                clearInterval(animator)
                $("#animator").html("Apply Transformation");
            }
        }
    };

    // find eigenvectors and eigenvalues from an inputted matrix, then update the correspoinding eigenvector html
    function customMatrix(a, c, b, d) {
        let matrix = [[a, b], [c, d]];
        let xEigVector0 = 2 * math.round(numeric.eig(matrix).E.x[0][0] * 100) / (100);
        let yEigVector0 = 2 * math.round(numeric.eig(matrix).E.x[1][0] * 100) / (100);
        let eigenvalue0 = math.round(numeric.eig(matrix).lambda.x[0] * 100) / 100;

        let xEigVector1 = 2 * math.round(numeric.eig(matrix).E.x[0][1] * 100) / (100);
        let yEigVector1 = 2 * math.round(numeric.eig(matrix).E.x[1][1] * 100) / (100);
        let eigenvalue1 = math.round(numeric.eig(matrix).lambda.x[1] * 100) / 100;

        $("#eigenvector1").html("Eigenvector 1: " + "(" + xEigVector0 + "," + yEigVector0 + ") <br> Eigenvalue 1: " + eigenvalue0);
        $("#eigenvector2").html("Eigenvector 2:" + "(" + xEigVector1 + "," + yEigVector1 + ") <br> Eigenvalue 2: " + eigenvalue1);
    };

    // function that updates all plots and resets the animator
    function inputupdate() {
        clearInterval(animator);
        counter = 0;
        $("#animator").html("Apply Transformation");
        let anglepi = Math.round(parseFloat(slider.val()) * 100 / math.pi) / 100
        probetitle.html("Probe line rotation: " + anglepi + "π")
        updatePlot();
    };

    //defines which function(s) to call when the matrix forms or sliders are updated
    $(".inputs").on("input", inputupdate);

    //defines which function(s) to call when the apply/pause/continue transformation buttons are clicked
    $("#animator").on("click", function () {
        if ($("#animator").html() == "Apply Transformation") {
            ispaused = false;
            startAnimation();
            $("#animator").html("Pause Transformation")
        } else if ($("#animator").html() == "Pause Transformation") {
            ispaused = true;
            $("#animator").html("Continue Transformation");
        } else if ($("#animator").html() == "Continue Transformation") {
            ispaused = false;
            $("#animator").html("Pause Transformation");
        }
    });

    //defines which function(s) to call when the reset transformation button is clicked
    $("#reset").on("click", inputupdate)
    //plot a new empty plot in the graph div, then call the update function
    let dummy;
    Plotly.newPlot("graph", dummy);
    inputupdate();
});