var x = 0;
var y = 0;
var z = 0;
var w = 0;

class auxRobotOrientation {
    constructor (x, y, z, w){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    setOrientationX(i) {
        this.x = i;
    }
    setOrientationY(i) {
        this.y = i;
    }
    setOrientationZ(i) {
        this.z = i;
    }
    setOrientationW(i) {
        this.w = i;
    }
    getOrientationX() {
        return this.x;
    }
    getOrientationY() {
        return this.y;
    }
    getOrientationZ() {
        return this.z;
    }
    getOrientationW() {
        return this.w;
    }
}

function roundToTwo(num) {
    return +(Math.round(num + "e+3")  + "e-3");
}

var robotOrientation = new auxRobotOrientation(x, y, z, w);

var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/kr10/endpoint_state',
    messageType : 'geometry_msgs/PoseStamped'
});

listener.subscribe(function (message){
        robotOrientation.setOrientationX(roundToTwo(message.pose.orientation.x));
        robotOrientation.setOrientationY(roundToTwo(message.pose.orientation.y));
        robotOrientation.setOrientationZ(roundToTwo(message.pose.orientation.z));
        robotOrientation.setOrientationW(message.pose.orientation.w);
});

console.log("X: " + robotOrientation.x + " Y: " + robotOrientation.y + " Z: " + robotOrientation.z + " W: " + robotOrientation.w);

function createOrientationTable() {

    var orientationTable = document.getElementById("robot_orientation");

    for (var numberRows = 0; numberRows < 4; numberRows++) {
        var row = orientationTable.insertRow(numberRows);

        orientationTable.cellPadding = "5px 5px 5px 5px";

        //Inserting the cells in the row;
        var NameCell = row.insertCell(0);
        var ValueCell = row.insertCell(1);

        NameCell.width = "200px";

        ValueCell.width = "120px";

        for (var numberCollumns = 0; numberCollumns < 2; numberCollumns++) {
            switch (numberRows) {
                case 0:

                    row.className = "table_even_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "X";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotOrientation.getOrientationX();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;

                case 1:

                    row.className = "table_odd_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "Y";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotOrientation.getOrientationY();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;

                case 2:

                    row.className = "table_even_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "Z";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotOrientation.getOrientationZ();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;
                case 3:

                    row.className = "table_odd_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "W";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotOrientation.getOrientationW();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;
    
            }
        }
    }
}

function updateOrientationTable()
{
	var updateOrientation = document.getElementById("robot_orientation");
	
	for (var i = 0; i != 4; i++)
	{
		var auxRobotInfoFunc1 = robotOrientation.getOrientationX();
        var auxRobotInfoFunc2 = robotOrientation.getOrientationY();
        var auxRobotInfoFunc3 = robotOrientation.getOrientationZ();
        var auxRobotInfoFunc4 = robotOrientation.getOrientationW();
        var x = Math.abs(auxRobotInfoFunc1);
        var y = Math.abs(auxRobotInfoFunc2);
        var z = Math.abs(auxRobotInfoFunc3);
        var w = Math.abs(auxRobotInfoFunc4);

        switch(i) {
            case 0:
                updateOrientation.rows[i].cells.item(1).innerHTML = x;
                console.log("Orientação X = " + x);
                break;
            case 1:
                updateOrientation.rows[i].cells.item(1).innerHTML = y;
                console.log("Orientação Y = " + y);
                break;
            case 2:
                updateOrientation.rows[i].cells.item(1).innerHTML = z;
                console.log("Orientação Z = " + z);
                break;
            case 3:
                updateOrientation.rows[i].cells.item(1).innerHTML = w;
                console.log("Orientação W = " + w);
                break; 
        }
	}
}