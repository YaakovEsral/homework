module.exports = (req, res, pageName) =>{
    if (req.magicWord) {
        res.write(`<h1>Welcome to the ${pageName} page!</h1>`);
    } else {
        res.write('<h1>Magic word, please...</h1>')
    }
}

