
const Nightmare = require('nightmare');
var http = require('http');

const getScript = (url) => {
    return new Promise((resolve, reject) => {
        const http      = require('http'),
              https     = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};

var getSheet = async () => {
	let sheetid = '1_LsGTOkoNOltEvxW_kwE7_GTENiE3DMLi0fdJhN3oZA';
	var url = 'https://spreadsheets.google.com/feeds/cells/'+sheetid+'/od6/public/values?alt=json';
    var sheetdata = JSON.parse(await getScript(url));
	return sheetdata.feed.entry;
};
async function getNick() {
	let sheetdata = await getSheet();
	//console.log(sheetdata);
	return {nick: sheetdata[0]['gs$cell']['$t'], pass: sheetdata[1]['gs$cell']['$t']};
}

async function loginName() {
	var user = await getNick();
	Nightmare({show: true})
	.goto('https://www.facebook.com')
	.wait()
	.type('#email', user.nick)
	.type('#pass', user.pass)
	.click('#u_0_8')
	.catch(error => {
		console.error('Search failed:', error)
	});
	
	
}


loginName();