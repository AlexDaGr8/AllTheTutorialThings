"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xmlhttprequest_1 = __importDefault(require("xmlhttprequest"));
const cheerio_1 = __importDefault(require("cheerio"));
const url = "https://www.discgolfscene.com/leagues/Ragnar_Overby_League_2019/leaderboards";
let makeRequest = function (url, method) {
    // Create the XHR request
    var request = new xmlhttprequest_1.default.XMLHttpRequest();
    // Return it as a Promise
    return new Promise((resolve, reject) => {
        // Setup our listener to process completed requests
        request.onreadystatechange = function () {
            // Only run if the request is complete
            if (request.readyState !== 4)
                return;
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request);
            }
            else {
                // If failed 
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        // Setup our HTTP request
        request.open(method || "GET", url, true);
        // Send the request
        request.send();
    });
};
makeRequest(url, 'GET')
    .then((val) => {
    const $ = cheerio_1.default.load(val);
    console.log($('table.leaderboard-full tbody'));
    $('table.leaderboard-full tbody').find('tr').each(d => {
        console.log('d', d.text());
    });
})
    .catch((err) => {
    console.log('err', err);
});
//# sourceMappingURL=app.js.map