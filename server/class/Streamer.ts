// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                          SNGenerator  - by weld                             //
//                           Streamer class file                               //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //


let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const appToken: string = 'xh6dvhkx4t45vcz7mxj9asbl7n2jvx';

/* regex for testing user's input */
let remove_strips = /<[^>]*>/;
let requirements = {
    'login':/^[a-zA-Z0-9_]{4,25}$/,
    'popup':/^.{2,28}$/,
    'notif':/^.{2,30}$/
};

/* creating a specific error if it does not match the requirements */
interface InfosError {
    name: string;
    message: string;
}

export class NotMatchingRequirements extends Error { 
    infos: InfosError;
    constructor(infos: InfosError) {
        super(infos.message)
        this.name = infos.name;
    }
}

/* main class */
export class Streamer {
    login:  string;
    icon:   string;
    url:    string;
    popup:  string;
    notif:  string;

    constructor(login:string, popup:string, notif:string) {
        this.login  = login;
        this.icon   = ''; // it will be defined through a function

        while(!this.login)
            this.url = '';
        
        this.url = 'https://www.twitch.tv/' + this.login.toLowerCase()
        this.popup  = popup;
        this.notif  = notif;

        // due to the api rate limit, the function cannot exceed 1 req/sec
        setTimeout(this.defineIcon, 1000);
        this.checkRequirements();
    }

    /* retrieve the url of the icon */
    private defineIcon(): void {
        let that: Streamer = this;
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
            this[r].replace(remove_strips, '');
            if(!requirements[r].test(this[r])) {
                console.log(this[r]);
                throw new NotMatchingRequirements({name:r, message:r+' does not match the requirements'});
            }
        }
    }
}

