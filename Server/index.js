// Load the http module to create an http server.
var http = require('http');

// Load the net module to create a tcp server.
var net = require('net');

// Heart rate array mesurements
var HR_val = [];
var HR_Last_Measurement = null;

//galvanic skin response mesurements
var GSR_val = [];
var GSR_Last_Measurement = null;

//Blink measurements
var BLINK_val = [];
var BLINK_Last_Measurement = null;

//determines if we are currently in calibration mode
var calibrationMode = false;

/**
 * Determines if an alert should be fired
 */
function alert(){
    return true;
}

/**
 * finds the value in strSearch with the key strKey
 */
function parseOutValue(strSearch,strKey){
    strArr = strSearch.split(' ');
    for(i = 0; i < strArr.length; i++){
        if(strArr[i].split(":")[0] == strKey){
            return strArr[i].split(":")[1];
        }
    }
    return -1;
}
// Configure our HTTP server to respond with Hello World to all requests.
var httpServer = http.createServer(function (req, res) {
  if (req.method == 'POST') {
        //Smart Watch
        //FORMNAME:VALUE
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function () {
            console.log("Body: " + body);

            //process the heart rate
            var HR_string = parseOutValue(body,"HR");
            if(HR_string != -1){
                var HR_value = parseFloat(HR_string);
                HR_val.push(HR_value);
                HR_Last_Measurement = Date.now();
            }

            //check if there's a change in the current calibration state
            var calibrationString = parseOutValue(body, "calibrating");
            if(calibrationString == "true"){
                calibrationMode = true;
            }else if(calibrationString == "false"){
                calibrationMode = false;
            }
        
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('post received');

        });
    }
    else
    {
        //Smartphone
        console.log("GET");
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(alert()){
            res.end("ALERTTRUE")
        }else{
            res.end("ALERTFALSE")
        }
        res.end();
    }
});

// Listen on port 8000, IP defaults to 127.0.0.1
httpServer.listen(8000);

// Creates a new TCP server. The handler argument is automatically set as a listener for the 'connection' event
var tcpServer = net.createServer(function (socket) {
    // arduino
    socket.on('data', function (data) {
        var dataStr = data.toString();
        console.log(JSON.stringify(dataStr));
        //process the GSR
        var GSR_string = parseOutValue(dataStr,"GSR");
        if(GSR_string != -1){
            var GSR_value = parseFloat(HR_string);
            GSR_val.push(GSR_value);
            console.log(BLINK_value)
            GSR_Last_Measurement = Date.now();
        }
        //process the Blink
        var BLINK_string = parseOutValue(dataStr,"BLINK");
        if(BLINK_string != -1){
            var BLINK_value = parseFloat(BLINK_string);
            BLINK_val.push(BLINK_value);
            console.log(BLINK_value);
            BLINK_Last_Measurement = Date.now();
        }
    });
    

});

// Fire up the server bound to port 7000 on localhost
tcpServer.listen(7000, "localhost");
