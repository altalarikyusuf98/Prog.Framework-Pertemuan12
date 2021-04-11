import {domainPath} from './Config'

const GetAPI = (path) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`${domainPath}/${path}`)
        .then(Response=>Response.json())
        .then((result)=>{
            resolve(result)
        }, (err) =>{
            reject(err)
        })
    })
    return promise
}

export default GetAPI