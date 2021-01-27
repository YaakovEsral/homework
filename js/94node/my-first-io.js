const fs = require('fs');

// const buff = fs.readFileSync(process.argv[2]).toString();
const buff = fs.readFileSync(process.argv[2], 'utf8').toString();
const arr = buff.split('\n');
console.log(arr.length - 1)
// console.log(buff)