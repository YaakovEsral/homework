const fs = require('fs');
const path = require('path');

const givenPath = process.argv[2];
const ext = process.argv[3];

fs.readdir(givenPath, (err, list) =>{
    list.forEach(li => {
        if(path.extname(li) === `.${ext}`){
            console.log(li);
        }
    });
})