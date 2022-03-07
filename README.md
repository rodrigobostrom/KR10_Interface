# WAAM Web Interface

Este repositorio contem a webpage utilizada para monitoramento de dados dos manipuladores KUKA localizados no LNTSold/UFRJ. Atraves dela, e possivel aferir dados
da Fronius Power Source, como corrente, tensao e velocidade de alimentacao do fio de arame, angulos das juntas do robo, incluindo da mesa KUKA KP2, posicao e orientacao do efetuador do robo em relacao a base, alem da visualizacao do manipulador pelo RVIZ. Um grafico tambem e tracado para ilustrar a variacao dos dados da Fronius Power Source ao longo do tempo.

## Installation Instructions

The following instructions are written for ROS NOETIC on Ubuntu 20.04. Following rospackages are needed:

- tf2_web_republisher:

```git clone https://github.com/RobotWebTools/tf2_web_republisher.git```

- robot_state_publisher:

``` sudo apt-get install ros-<rosdistro>-robot-state-publisher ```

- rosbridge:

``` sudo apt-get install ros-<rosdistro>-rosbridge-server ```

- Apache server is also needed:

```sudo apt-get install apache2```

With all the previous steps acomplished, clone this repository to /home/you/path_you_decide/. Then, perform the following steps:

```bash
cp -r ~/catkin_ws/src/rosi_description /home/you/path_you_decide/rosiwebgui/
gedit /home/you/path_you_decide/rosiwebgui/JavaScripts/RvizTable.js
```

Find the following line of code var urdfPath = "http://172.16.11.27";, substitute http://172.16.11.27 for the robot fixed ip you configured then perform the operations below

```bash
sudo rm -r /var/www/html/*
sudo cp -r /home/you/path_you_decide/KR10_Interface/* /var/www/html/
sudo ln -s /var/www/html/kr10.html /var/www/html/index.html
```

Then, all you have to do is to access the robot's IP address via browser. If IP is 172.16.11.27, then the url will be http://172.16.11.27. The webpage is online whenever the robot is on.
