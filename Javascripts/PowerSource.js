var current = 0;
var voltage = 0;
var wireFeedSpeed = 0;

class auxPowerInfo {
    constructor (current, voltage, wireFeedSpeed){
        this.current = current;
        this.voltage = voltage;
        this.wireFeedSpeed = wireFeedSpeed;
    }
    setCurrent(x) {
        this.current = x;
    }
    setVoltage(x) {
        this.voltage = x;
    }
    setWireFeedSpeed(x) {
        this.wireFeedSpeed = x;
    }
    getCurrent() {
        return this.current;
    }
    getVoltage() {
        return this.voltage;
    }
    getWireFeedSpeed() {
        return this.wireFeedSpeed;
    }
}

var powerInfo = new auxPowerInfo(current, voltage, wireFeedSpeed);

var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/power_sourcer_readings',
    messageType : 'kuka_rsi_hw_interface/PwrSrc'
});

listener.subscribe(function (message){
        powerInfo.setCurrent(message.current);
        powerInfo.setVoltage(message.voltage);
        powerInfo.setWireFeedSpeed(message.wire_feed_speed);
});

console.log("Corrente: " + powerInfo.current + " Voltagem: " + powerInfo.voltage);

function createPwrSrcTable() {

    var controlTable = document.getElementById("power_sourcer");

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
                            var rowName = "Arc Current (A)";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxPowerInfoFunc = powerInfo.getCurrent();
                            ValueCell.innerHTML = auxPowerInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;

                case 1:

                    row.className = "table_odd_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "Arc Voltage (V)";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxPowerInfoFunc = powerInfo.getCurrent();
                            ValueCell.innerHTML = auxPowerInfoFunc;
                            ValueCell.tabIndex = "1";
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
                            var auxPowerInfoFunc = powerInfo.getCurrent();
                            ValueCell.innerHTML = auxPowerInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;
            }
        }
    }
}

function updatePowerSourcerReadings()
{
    var updatePwrSrc = document.getElementById("power_sourcer");

    for (var i = 0; i != 3; i++)
    {
        var auxPowerInfoFunc1 = powerInfo.getCurrent();
        var auxPowerInfoFunc2 = powerInfo.getVoltage();
        var auxPowerInfoFunc3 = powerInfo.getWireFeedSpeed();
        var current = Math.abs(auxPowerInfoFunc1);
        var voltage = Math.abs(auxPowerInfoFunc2);
        var wireFeedSpeed = Math.abs(auxPowerInfoFunc3);
        
        switch (i) {
            case 0:

              // CORRENTE
            if(current > 500 && current <= 1000)
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'yellow';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = (current.toString()).bold();
            }
            else if (current > 1000)
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'red';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = (current.toString()).bold();
            }
            else
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'black';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = current;
            }
            break;  

            case 1:

            // TENSÃO
            if(voltage > 500 && voltage <= 1000)
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'yellow';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = (voltage.toString()).bold();
            }
            else if (voltage > 1000)
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'red';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = (voltage.toString()).bold();
            }
            else
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'black';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = voltage;
            }
            break;

            case 2:

            // VELOCIDADE DO ARAME
            if(wireFeedSpeed > 500 && wireFeedSpeed <= 1000)
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'yellow';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = (wireFeedSpeed.toString()).bold();
            }
            else if (wireFeedSpeed > 1000)
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'red';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = (wireFeedSpeed.toString()).bold();
            }
            else
            {
                updatePwrSrc.rows[i].cells.item(1).style.color = 'black';
                updatePwrSrc.rows[i].cells.item(1).innerHTML = wireFeedSpeed;
            } 
            break;
        }
    }
}