let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const appToken: string = 'xh6dvhkx4t45vcz7mxj9asbl7n2jvx';

let remove_strips = /<[^>]*>/;
let requirements = {
    'login':/^[a-zA-Z0-9_]{4,25}$/,
    'popup':/^.{0,28}$/,
    'notif':/^.{0,30}$/
}

export class Streamer {
    login:  string;
    icon:   string;
    url:    string;
    popup:  string;
    notif:  string;

    constructor(login:string, popup:string, notif:string) {
        this.login  = login;
        this.icon   = ''; // it will be defined through a function
        this.url = 'https://www.twitch.tv/' + this.login.toLowerCase();
        this.popup  = popup;
        this.notif  = notif;

        this.defineIcon();
        this.checkRequirements();
    }

    /* retrieve the url of the icon */
    private defineIcon(): void {
        let that = this;
        let req = new XMLHttpRequest();
        req.open('GET', 'https://api.twitch.tv/helix/users?login='+ this.login);
        req.setRequestHeader('Client-ID', appToken);
        req.onload = function() {
            let res = JSON.parse(this.responseText);
            that.icon = res.data[0].profile_image_url;
        };
        req.onerror = () => {
            throw new Error('Can\'t access to twitch api');
        }
        req.send();
    }


    /* checking all the requirements */
    private checkRequirements(): void {
        for (let r in requirements) {
            if(!requirements[r].test(this[r]))
                throw new Error(r);
        }
    }
}

