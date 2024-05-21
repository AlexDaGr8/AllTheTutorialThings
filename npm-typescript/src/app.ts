import XMLHttpRequest from 'xmlhttprequest'
import cheerio from 'cheerio';


const url = "https://www.discgolfscene.com/leagues/Ragnar_Overby_League_2019/leaderboards";

let makeRequest = function (url, method) {
    // Create the XHR request
    var request = new XMLHttpRequest.XMLHttpRequest();

    // Return it as a Promise
    return new Promise((resolve, reject) => {
        // Setup our listener to process completed requests
        request.onreadystatechange = function () {
            // Only run if the request is complete
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request)
            } else {
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
        const $ = cheerio.load(val);
        console.log($('table.leaderboard-full tbody'))
        $('table.leaderboard-full tbody').find('tr').each(d => {
            console.log('d', d.text())
        });
    })
    .catch((err) => {
        console.log('err', err);
    })