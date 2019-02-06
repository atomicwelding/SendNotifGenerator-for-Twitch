"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                          SNGenerator  - by weld                             //
//                           Main file's server                                //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
var Streamer = require('./class/Streamer').Streamer, NotMachingRequirements = require('./class/Streamer').NotMachingRequirements;
var urlparser = require('url');
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
/* --- MAIN --- */
var http = require('http');
var server = http.createServer(function (req, res) {
    if (req.method === 'GET')
        getHandler(req, res);
    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
    }
});
server.listen(_PORT_);
console.log('[INFO] Server is now running');
