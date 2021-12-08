//Declaring connection variables
var connectState = false;
var ros = new ROSLIB.Ros({});
var localHost;

window.ros = ros;

function connect()
{
    if (!connectState)
    {
        this.localHost = prompt("Enter the ip adress of the websocket:", "172.16.11.27");
        this.rosUrl = "ws://" + this.localHost + ":9090/";
        ros.connect(rosUrl);
    }
    else
    {
        ros.close();
    }
}

// Connection State Functions
function updateConnectionImage()
{
    var updateConnectionImage = document.getElementById('connected_image');

    if(connectState)
    {
        updateConnectionImage.src = 'img/Connected.png';
    }
    else
    {
        updateConnectionImage.src = 'img/Disconnected.png';
    }
}