window.onload = function () {
    
    // dataPoints.
    // var dps = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
    var dps1 = [{x: 0, y: 0}];
    var dps2 = [{x: 0, y: 0}];
    var dps3 = [{x: 0, y: 0}];

    console.log(dps1);
    var chart1 = new CanvasJS.Chart("chartCurrent",{
        animationEnabled: true,
        backgroundColor: "#F5DEB3",
        lineColor: "black",
        title :{
            text: "Arc Current"
        },
        axisX: {						
            title: "Time (s)"
        },
        axisY: {						
            title: "Arc Current (A)"
        },
        data: [{
            type: "spline",
            dataPoints : dps1
        }]
    });

    chart1.render();

    var chart2 = new CanvasJS.Chart("chartVoltage",{
        animationEnabled: true,
        backgroundColor: "#F5DEB3",
        lineColor: "black",
        title :{
            text: "Arc Voltage"
        },
        axisX: {						
            title: "Time (s)"
        },
        axisY: {						
            title: "Arc Voltage (V)"
        },
        data: [{
            type: "spline",
            dataPoints : dps2
        }]
    });

    chart2.render();

    var chart3 = new CanvasJS.Chart("chartWireFeed",{
        animationEnabled: true,
        backgroundColor: "#F5DEB3",
        lineColor: "black",
        title :{
            text: "Wire Feed Speed"
        },
        axisX: {						
            title: "Time (s)"
        },
        axisY: {						
            title: "Wire Feed Speed (mm/s)"
        },
        data: [{
            type: "spline",
            dataPoints : dps3
        }]
    });

    chart3.render();

    var xVal1 = dps1.length;
    var xVal2 = dps2.length;
    var xVal3 = dps3.length;
    yVal = [0, 0, 0];
    
    var updateInterval = 1000;

    var updateChart = function updateChart() {

        // update chart after specified time. 
        for(i=0;i<=dps1.length;i++){

            switch (i){
                case 0:
                    yVal[i] = powerInfo.getCurrent();
                    dps1.push({x: xVal1,y: yVal[i]});
                    xVal1++;
                    break;
                case 1:
                    yVal[i] = powerInfo.getVoltage();
                    dps2.push({x: xVal2,y: yVal[i]});
                    xVal2++;
                    break;
                case 2:
                    yVal[i] = powerInfo.getWireFeedSpeed();
                    dps3.push({x: xVal3,y: yVal[i]});
                    xVal3++;
                    break;
            }

        }
        
        if (dps1.length > 10 ){
            if (dps2.length > 10 ){
                if (dps3.length > 10 ){
                    dps1.shift();
                    dps2.shift();
                    dps3.shift();
                }
            }
        }			

        console.log("Xval = " + xVal1 + ", Yval = " + yVal);
        chart1.render();
        chart2.render();
        chart3.render();		

    };

    setInterval(function(){updateChart()}, updateInterval); 
}