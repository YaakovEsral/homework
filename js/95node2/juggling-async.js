const http = require('http');

let responseData = [];
let responses = 0;

let urls = [];
for (let i = 2; i < process.argv.length; i++) {
    urls.push(process.argv[i]); 
}

function getHttp(url, index) {
    http.get(url, res =>{
        res.on('error', err =>{
            return console.error(err)
        });

        res.on('data', data =>{
            if(!responseData[index]) {
                responseData[index] = '';
            }
            responseData[index] += data;
        })

        res.on('end', () =>{
            responses++;
            if(responses === urls.length){
                printAllData(responseData);
            }
        })
    })
}

function printAllData(dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
        console.log(dataArray[i]);
    }
}

for (let i = 0; i < urls.length; i++) {
    getHttp(urls[i], i)
}