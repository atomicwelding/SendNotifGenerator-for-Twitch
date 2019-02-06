"use strict";
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                          SNGenerator  - by weld                             //
//                           Streamer class file                               //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var appToken = 'xh6dvhkx4t45vcz7mxj9asbl7n2jvx';
/* regex for testing user's input */
var remove_strips = /<[^>]*>/;
var requirements = {
    'login': /^[a-zA-Z0-9_]{4,25}$/,
    'popup': /^.{2,28}$/,
    'notif': /^.{2,30}$/
};
var NotMatchingRequirements = /** @class */ (function (_super) {
    __extends(NotMatchingRequirements, _super);
    function NotMatchingRequirements(infos) {
        var _this = _super.call(this, infos.message) || this;
        _this.name = infos.name;
        return _this;
    }
    return NotMatchingRequirements;
}(Error));
exports.NotMatchingRequirements = NotMatchingRequirements;
/* main class */
var Streamer = /** @class */ (function () {
    function Streamer(login, popup, notif) {
        this.login = login;
        this.icon = ''; // it will be defined through a function
        while (!this.login)
            this.url = '';
        this.url = 'https://www.twitch.tv/' + this.login.toLowerCase();
        this.popup = popup;
        this.notif = notif;
        // due to the api rate limit, the function cannot exceed 1 req/sec
        setTimeout(this.defineIcon, 1000);
        this.checkRequirements();
    }
    /* retrieve the url of the icon */
    Streamer.prototype.defineIcon = function () {
        var that = this;
        var req = new XMLHttpRequest();
        req.open('GET', 'https://api.twitch.tv/helix/users?login=' + this.login);
        req.setRequestHeader('Client-ID', appToken);
        req.onload = function () {
            var res = JSON.parse(this.responseText);
            that.icon = res.data[0].profile_image_url;
        };
        req.onerror = function () {
            throw new Error('Can\'t access to twitch api');
        };
        req.send();
    };
    /* checking all the requirements */
    Streamer.prototype.checkRequirements = function () {
        for (var r in requirements) {
            this[r].replace(remove_strips, '');
            if (!requirements[r].test(this[r])) {
                console.log(this[r]);
                throw new NotMatchingRequirements({ name: r, message: r + ' does not match the requirements' });
            }
        }
    };
    return Streamer;
}());
exports.Streamer = Streamer;
