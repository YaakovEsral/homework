const http = require('http');
const bl = require('bl');

// http.get(process.argv[2], res =>{
    
//     res.on('error', console.error);

//     let dataString = '';
//     res.on('data', data =>{
//         dataString += data;
//     })

//     res.on('end', () =>{
//         console.log(dataString.length);
//         console.log(dataString);
//     })
// })

http.get(process.argv[2], res =>{
    
    res.pipe(bl( (err, data) =>{
        if(err) {
            return console.error(err)
        }
        data = data.toString()
        console.log(data.length)
        console.log(data);
    }) )
    
})