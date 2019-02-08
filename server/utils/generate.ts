// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                          SNGenerator  - by weld                             //
//                  Some functions used to generate the ext                    //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

import * as S from '../class/Streamer';
import * as fs from 'fs';
import * as hash from 'crypto';

/* --- FUNCTION --- */


/* --- MAIN --- */
export function generate(token: string, strmr: S.Streamer): void {
    // only used to name the file
    let h = hash.createHash('sha1').update(strmr.login).digest('hex');
    console.log(h);
}   