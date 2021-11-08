// Connecting to ROS
// -----------------

var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

function init() {
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  // Adds a listener for a connection event to the ros object.
  ros.on('connection', function() {
    console.log('Connected to websocket server.');
    connectState = true;
  });
}

function connect() {
  if (!connectState) {
    ros = new ROSLIB.Ros({
        url: 'ws://172.16.11.27:9090/'
    });

    ros.on('connection', function() {
        console.log('Connected to websocket server.');
        connectState = true;
    });
  }
}

ros.on('error', function(error) {
  console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
});