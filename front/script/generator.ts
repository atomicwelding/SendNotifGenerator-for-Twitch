// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                              SNGenerator  - by weld                         //
//                                                                             //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

const HURL = 'http://localhost:8550/'


/* --- FUNCTIONS --- */
let gtv = function getTheValue(id: string): string {
    return (<HTMLInputElement>document.getElementById(id)).value;
}

let redBox = function getThevalue(id: string): void {
    document.getElementById(id).style.backgroundColor = '#ff7c68';
    document.getElementById(id).style.border = '1px solid #ff7c68';
    document.getElementById(id).style.boxShadow = '0 0 10px #ff7c68';
}

/* --- MAIN --- */
~function main(): void {
    document.getElementById('submit').addEventListener('click', () => {
        let queryUrl = HURL + '?login='+ gtv('login') + '&popup=' + gtv('popup')+'&notif=' + gtv('notif');
        let xhr = new XMLHttpRequest();
        xhr.open('GET', queryUrl);
        xhr.onload = function() {
            if(this.status == 400) { 
                redBox(this.responseText.split(' ')[0]);
                alert(this.responseText);
            } else {
                console.log(this.status);
            }
        }
        xhr.send();
    });
}();