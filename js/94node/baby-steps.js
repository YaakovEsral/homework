const reducer = (a, b, c) =>{
    if(c >= 2) {
        return +a + +b;
    } else
        return 0;
}

console.log(process.argv.reduce(reducer));