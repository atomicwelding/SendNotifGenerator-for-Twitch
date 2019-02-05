// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                              SNGenerator  - by weld                         //
//                                                                             //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
/* Got it from the twitch API */
var user_requirements = /^[a-zA-Z0-9_]{4,25}$/;
var popup_requirements = /^.{0,28}$/;
var notif_requirements = /^.{0,30}$/;
var remove_strips = /<[^>]*>/;
// 28 popup
// 30 notif
/* --- CLASS --- */
var Streamer = /** @class */ (function () {
    function Streamer(login, popup, notif) {
        try {
            this.login = this.checkLoginRequirements(login);
            this.icon = ''; // retrieve the icon 
            this.url = 'https://www.twitch.tv/' + this.login.toLowerCase();
            this.popup = this.checkPopupRequirements(popup);
            this.notif = this.checkNotifRequirements(notif);
        }
        catch (e) {
            if (e.message === 'InputError')
                this.abort();
            else
                console.log(e);
        }
    }
    /* When an error is thrown */
    Streamer.prototype.abort = function () {
        location.reload();
    };
    /* Check if infos match the requirements*/
    Streamer.prototype.checkLoginRequirements = function (login) {
        if (user_requirements.test(login))
            return login;
        else {
            alert('Login must only contains alphanumericals characters, underscores, and length should be ranged between 4 and 13 chars');
            throw new Error('InputError');
        }
    };
    Streamer.prototype.checkPopupRequirements = function (popup) {
        popup = popup.replace(remove_strips, '');
        if (popup_requirements.test(popup))
            return popup;
        else {
            alert('Popup\'s length message should be ranged between 0 and 28');
            throw new Error('InputError');
        }
    };
    Streamer.prototype.checkNotifRequirements = function (notif) {
        notif = notif.replace(remove_strips, '');
        if (notif_requirements.test(notif))
            return notif;
        else {
            alert('Notification\'s length message should be ranged between 0 and 30');
            throw new Error('InputError');
        }
    };
    return Streamer;
}());
/* --- FUNCTIONS --- */
var gtv = function getTheValue(id) {
    return document.getElementById(id).value;
};
/* --- MAIN --- */
~function main() {
    document.getElementById('submit').addEventListener('click', function () {
        var s = new Streamer(gtv('login'), gtv('popup'), gtv('notif'));
    });
}();
