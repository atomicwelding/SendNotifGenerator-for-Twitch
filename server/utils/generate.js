"use strict";
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                          SNGenerator  - by weld                             //
//                  Some functions used to generate the ext                    //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hash = __importStar(require("crypto"));
/* --- FUNCTION --- */
/* --- MAIN --- */
function generate(token, strmr) {
    // only used to name the file
    var h = hash.createHash('sha1').update(strmr.login).digest('hex');
    console.log(h);
}
exports.generate = generate;
