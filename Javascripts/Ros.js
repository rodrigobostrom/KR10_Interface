// Connecting to ROS
// -----------------

var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

function init() {
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  // Adds a listener for a connection event to the ros object. Do the same for error and close events.
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

function helloWorld(){

// Publishing a Topic
// ------------------

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/talker',
    messageType : 'beginner_tutorials/talker'
  });

  var twist = new ROSLIB.Message({
    linear : {
      x : 0.1,
      y : 0.2,
      z : 0.3
    },
    angular : {
      x : -0.1,
      y : -0.2,
      z : -0.3
    }
  });
  console.log("Publishing talker");
  cmdVel.publish(twist);
}

// Subscribing to a Topic
// ----------------------

function subscribeHelloWorld() {

  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/chatter',
    messageType : 'std_msgs/String'
  });

  listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    document.getElementById('data').innerHTML += '<p>'+ message.data +'</p>'
    //listener.unsubscribe();
  });

}

//document.getElementById("connection_state").onclick = subscribeHelloWorld;

// Getting and setting a param value
// ---------------------------------

ros.getParams(function(params) {
  console.log(params);
});

var maxVelX = new ROSLIB.Param({
  ros : ros,
  name : 'max_vel_y'
});

maxVelX.set(0.8);
maxVelX.get(function(value) {
  console.log('MAX VAL: ' + value);
});