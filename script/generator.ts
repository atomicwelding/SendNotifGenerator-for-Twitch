// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                              SNGenerator  - by weld                         //
//                                                                             //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

/* Got it from the twitch API */
let user_requirements   = /^[a-zA-Z0-9_]{4,25}$/;

let popup_requirements  = /^.{0,28}$/;
let notif_requirements  = /^.{0,30}$/;
let remove_strips       = /<[^>]*>/;

/* --- CLASS --- */
class Streamer {
    
    login: string;
    icon: string;
    
    url: string;
    
    popup: string;
    notif: string;

    constructor(login: string, popup: string, notif: string){
        
        try {
            this.login = this.checkLoginRequirements(login);
            this.icon = ''; // retrieve the icon 
    
            this.url = 'https://www.twitch.tv/'+this.login.toLowerCase();
    
            this.popup = this.checkPopupRequirements(popup);
            this.notif = this.checkNotifRequirements(notif);
        } catch(e) {
            if(e.message === 'InputError')
                this.abort();
            else
                console.log(e);
        }

    }

    /* When an error is thrown */
    private abort(): void {
        location.reload();
    }
    
    /* Check if infos match the requirements*/
    private checkLoginRequirements(login: string): string {
        if(user_requirements.test(login))
            return login;
        else {
            alert('Login must only contains alphanumericals characters, underscores, and length should be ranged between 4 and 13 chars');
            throw new Error('InputError');
        }
    }
    
    private checkPopupRequirements(popup: string): string {
        popup = popup.replace(remove_strips, '');
        if(popup_requirements.test(popup))
            return popup;
        else {
            alert('Popup\'s length message should be ranged between 0 and 28');
            throw new Error('InputError');
        }
    }

    private checkNotifRequirements(notif: string): string {
        notif = notif.replace(remove_strips, '');
        if(notif_requirements.test(notif))
            return notif;
        else {
            alert('Notification\'s length message should be ranged between 0 and 30');
            throw new Error('InputError');
        }
    }

    /* */ 

}

/* --- FUNCTIONS --- */
let gtv = function getTheValue(id: string): string {
    return (<HTMLInputElement>document.getElementById(id)).value;
}

/* --- MAIN --- */
~function main(): void {
    document.getElementById('submit').addEventListener('click', () => {
        let s = new Streamer(gtv('login'), gtv('popup'), gtv('notif'));
    });
}();