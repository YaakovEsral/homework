export default function executeFetch(url) {
    return fetch(url)
    .then( r =>{
        if(!r.ok){
            throw new Error(r.status, r.statusText)
        }
        return r.json()
        .then( data =>{
            return data;
        })
        .catch(err =>{
            console.error(err)
        })
    })
}