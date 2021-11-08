var robotViz = false;
connectState = true;

function startRobotViz()
{
    if (!robotViz && connectState)
    {
        robotViz = true;

        var initPos = {
            x : 1.50,
            y : 1.50,
            z : 1.50
        };

        // var urdfPath = "http://" + localHost + "/RosiWebGUI";
        var urdfPath = "http://172.16.11.27";

        // Create the main viewer.
        var viewer = new ROS3D.Viewer({
            divID : "robot_viz_container",
            width : 400,
            height : 400,
            antialias : true,
            intensity : 0.05,
            background : '#f8f8ff',
            cameraPose : initPos
        });

        // Add a grid.
        viewer.addObject(new ROS3D.Grid());

        // Setup a client to listen to TFs.
        var tfClient = new ROSLIB.TFClient({
            ros : ros,
            angularThres : 0.01,
            transThres : 0.01,
            rate : 10.0,
            fixedFrame : '/rosi_base_link'
        });

        var urdfClient = new ROS3D.UrdfClient({
            ros : ros,
            tfClient : tfClient,
            param: 'rosi/robot_description',
            path : urdfPath,
            rootObject : viewer.scene,
            loader : ROS3D.COLLADA_LOADER_2
        });
    }
}