// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                              SNGenerator  - by weld                         //
//                                                                             //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
var Streamer = require('./class/Streamer').Streamer;
var _TOKEN_ = 'xh6dvhkx4t45vcz7mxj9asbl7n2jvx';
var _PORT_ = 8550;
/* --- FUNCTION --- */
var getHandler = function (req, res) {
    try {
        var s = new Streamer('abcd', 'bcd', 'ccd');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(s.login + ': ' + s.icon);
    }
    catch (e) {
        console.log(e);
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
console.log('server is now running');
