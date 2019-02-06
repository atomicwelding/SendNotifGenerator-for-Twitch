// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                          SNGenerator  - by weld                             //
//                           Main file's server                                //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
var Streamer = require('./class/Streamer').Streamer, NotMachingRequirements = require('./class/Streamer').NotMachingRequirements;
var urlparser = require('url');
var fs = require('fs');
var date = require('date-and-time');
var _TOKEN_ = 'xh6dvhkx4t45vcz7mxj9asbl7n2jvx';
var _PORT_ = 8550;
/* --- FUNCTION --- */
var getHandler = function (req, res) {
    /* allowing CORS */
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    try {
        /* fetch the request*/
        var queries = urlparser.parse(req.url, true).query;
        log(req.method, req.connection.remoteAddress, req.url.path, JSON.stringify(queries));
        var s = new Streamer(queries.login, queries.popup, queries.notif);
        /* render a response */
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('No error (:');
    }
    catch (err) {
        var errMsg = err.name + ' ';
        switch (err.name) {
            case 'login':
                errMsg += 'must only contains alphanumericals characters, underscores, and length should be ranged between 4 and 13 chars';
                break;
            case 'popup':
                errMsg += '\'s length message should be ranged between 2 and 28';
                break;
            case 'notif':
                errMsg += '\'s length message should be ranged between 2 and 30';
                break;
            default:
                errMsg = 'Interval server error, check out the logs';
                console.log('Internal server error: ' + err);
                break;
        }
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(errMsg);
    }
};
/*time utility */
/* @from https://hype.codes/how-get-current-date-javascript */
var dateNow = function () {
    return new Date().toJSON().slice(0, 10).replace(/-/g, '_');
};
/* logs all requests in a logfile */
var log = function (reqType, IpAddr, reqUrl, queries) {
    if (reqUrl === void 0) { reqUrl = '/'; }
    if (queries === void 0) { queries = ''; }
    var toLog = "[" + reqType.toUpperCase() + "] " + reqUrl + " \nFROM " + IpAddr + "\nWITH params = " + queries + "\n\n";
    fs.writeFile('./logs/' + dateNow() + '.txt', toLog, { flag: 'a' }, function (err) {
        if (err)
            console.log(err);
    });
};
/* --- MAIN --- */
var http = require('http');
var server = http.createServer(function (req, res) {
    if (req.method === 'GET')
        getHandler(req, res);
    else {
        log(req.method, req.connection.remoteAddress);
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
    }
});
server.listen(_PORT_);
console.log('[INFO] Server is now running');
