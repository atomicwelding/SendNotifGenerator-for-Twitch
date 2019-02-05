// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                              SNGenerator  - by weld                         //
//                                                                             //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
/* Got it from the twitch API */
let user_requirements = /^[a-zA-Z0-9_]{4,25}$/;
let popup_requirements = /^.{0,28}$/;
let notif_requirements = /^.{0,30}$/;
let remove_strips = /<[^>]*>/;
class Streamer {
    constructor() {
        this.login = 'Oui ! ';
    }
}
/* --- FUNCTIONS --- */
let gtv = function getTheValue(id) {
    return document.getElementById(id).value;
};
/* --- MAIN --- */
~function main() {
    document.getElementById('submit').addEventListener('click', () => {
        let s = new Streamer();
        alert(s['login']);
    });
}();
