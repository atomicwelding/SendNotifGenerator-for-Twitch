// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                              SNGenerator  - by weld                         //
//                                                                             //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

let Streamer = require('./class/Streamer').Streamer;

let _TOKEN_: string = 'xh6dvhkx4t45vcz7mxj9asbl7n2jvx';
let _PORT_: number = 8550;

/* --- FUNCTION --- */
let getHandler = (req, res) => {
    try {
        let s = new Streamer('abcd', 'bcd', 'ccd');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(s.login + ': ' + s.icon);
    } catch (e) {
        console.log(e);
    }
}
/* --- MAIN --- */
let http = require('http');
let server = http.createServer((req, res) => {
    if(req.method === 'GET')
        getHandler(req, res);
        else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Method not allowed');
    }
});

server.listen(_PORT_);
console.log('server is now running');