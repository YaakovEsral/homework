module.exports = retrieveFiles;
const fs = require('fs');
const path = require('path');

function retrieveFiles(directory, extension, callback) {
    fs.readdir(directory, (err, data) =>{
        if(err) {
            return callback(err);
        }

        const files = data.filter(file => path.extname(file) === `.${extension}`)
        callback(null, files);
    });
}