"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var appToken = 'xh6dvhkx4t45vcz7mxj9asbl7n2jvx';
var remove_strips = /<[^>]*>/;
var requirements = {
    'login': /^[a-zA-Z0-9_]{4,25}$/,
    'popup': /^.{0,28}$/,
    'notif': /^.{0,30}$/
};
var Streamer = /** @class */ (function () {
    function Streamer(login, popup, notif) {
        this.login = login;
        this.icon = ''; // it will be defined through a function
        this.url = 'https://www.twitch.tv/' + this.login.toLowerCase();
        this.popup = popup;
        this.notif = notif;
        this.defineIcon();
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
            if (!requirements[r].test(this[r]))
                throw new Error(r);
        }
    };
    return Streamer;
}());
exports.Streamer = Streamer;
