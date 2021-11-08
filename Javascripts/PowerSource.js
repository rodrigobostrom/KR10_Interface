var current = 10;
var voltage = 10;
var wireFeedSpeed = 1;

var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/power_sourcer_readings',
    messageType : 'kuka_rsi_hw_interface/PwrSrc'
});

listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + 'Corrente: ' + message.current + 'Tensão' + message.voltage);
    //document.getElementById('power_sources').innerHTML += '<h4>'+ 'Corrente: ' + message.current +'</h4>'
    //document.getElementById('power_sources').innerHTML += '<h4>'+ 'Tensão: ' + message.voltage +'</h4>'
});

function createTable() {
    var controlTable = document.getElementById("power_sources");

    //real_current = message.current;
    //real_voltage = message.voltage;

    for (var numberRows = 0; numberRows < 3; numberRows++) {
        var row = controlTable.insertRow(numberRows);

        controlTable.cellPadding = "5px 5px 5px 5px";

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
                            var rowName = "Current (A)";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            ValueCell.innerHTML = current;

                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;

                case 1:

                    row.className = "table_odd_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "Voltage (V)";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            ValueCell.innerHTML = voltage;

                            ValueCell.tabIndex = "2";
                            break;
                    }
                    break;

                case 2:

                    row.className = "table_even_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "Wire Feed Speed (mm/s)";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            ValueCell.innerHTML = wireFeedSpeed;

                            ValueCell.tabIndex = "3";
                            break;
                    }
                    break;
            }
        }
    }
}