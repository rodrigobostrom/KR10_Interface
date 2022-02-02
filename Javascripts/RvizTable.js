var robotViz = false;
// var connectState = true;

function startRobotViz()
{
    console.log("Start RVIZ Button");

    if (!robotViz && connectState)
    {
        console.log("Entrou no IF");
        robotViz = true;

        var initPos = {
            x : 1.50,
            y : 1.50,
            z : 1.50
        };

        // var urdfPath = "http://" + localHost + "/KR10";
        var urdfPath = "http://127.0.0.1";

        // Create the main viewer.
        var viewer = new ROS3D.Viewer({
            divID : "robot_viz_container",
            width : 600,
            height : 600,
            antialias : true,
            intensity : 0.05,
            // background : '#f8f8ff',
            background : '#363636',
            cameraPose : initPos
        });

        console.log(viewer);

        // Add a grid.
        viewer.addObject(new ROS3D.Grid());

        // Setup a client to listen to TFs.
        var tfClient = new ROSLIB.TFClient({
            ros : ros,
            angularThres : 0.01,
            transThres : 0.01,
            rate : 10.0,
            fixedFrame : '/kr10_base_link'
        });

        var urdfClient = new ROS3D.UrdfClient({
            ros : ros,
            tfClient : tfClient,
            param: '/robot_description',
            path : urdfPath,
            rootObject : viewer.scene,
            loader : ROS3D.COLLADA_LOADER_2
        });
    }
}