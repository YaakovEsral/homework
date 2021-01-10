export default function executeFetch(url, setInfo, setError) {
    fetch(url)
    .then( r =>{
        if(!r.ok){
            setError(`${r.status} ${r.statusText}`)
            return;
            // throw new Error(r.status, r.statusText)
        }
        return r.json()
        .then( data =>{
            setError(null);
            setInfo(data);
            // return data;

        })
        .catch(err =>{
            // console.error(err);
            // setError(err);
        })
    })
}