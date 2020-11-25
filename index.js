'use strict';
var fs = require('fs'),
http = require('http'),
path = require('path');

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({
    strict: false
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var cors = require('cors');

// use it before all route definitions
app.use(cors(/*{origin: 'http://localhost:4200'}*/{origin: '*'}));
var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
var serverPort = 8088;

var spec = fs.readFileSync(path.join(__dirname, '/api/openapi.yaml'), 'utf8');
var oasDoc = jsyaml.safeLoad(spec);

var options_object = {
    controllers: path.join(__dirname, './controllers'),
    loglevel: 'info',
    strict: false,
    router: true,
    validator: true
};

/*function updateCalendars(){
    var date=new Date();
    var year=date.getFullYear();
    connection.query('SELECT id FROM Researcher', function (error, results, fields) {
        if (error) throw error;
        console.log('Script de actualización de calendarios de los investigadores... Actualización anual... The response is: ', results);
        results.forEach(element => {
            //console.log(element.id)
            connection.query('SELECT id FROM calendar AS C WHERE C.fk_researcher='+element.id, function (error, results, fields) {
                if (error) throw error;
                if(results[0]!=undefined){
                    console.log('The calendar is: ', results[0].id);
                    connection.query("CALL createYears("+results[0].id+","+(year+1)+")", function (error, results, fields) {
                        if (error) throw error;
                        console.log('The solution is: ', results);
                    });
                }
              });
        });
      });
}*/
//setTimeout(updateCalendars, 28927800000);


oasTools.configure(options_object);

oasTools.initialize(oasDoc, app, function() {
    http.createServer(app).listen(serverPort, function() {
        console.log("App running at http://localhost:" + serverPort);
        console.log("________________________________________________________________");
        if (options_object.docs !== false) {
            console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
            console.log("________________________________________________________________");
        }
    });
});