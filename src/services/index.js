import GetAPI from './Get'
import PostAPI from './Post'
import DeleteAPI from './Delete'

// const domainPath = 'http://localhost:3001'
// const GetAPI = (path) => {
//     const promise = new Promise((resolve, reject) => {
//         fetch(`${domainPath}/${path}`)
//             .then(Response => Response.json())
//             .then((result) => {
//                 resolve(result);
//             }, (err) => {
//                 reject(err);
//             })
//     })
//     return promise;
// }

// const PostAPI = (path, data) => {
//     const promise = new Promise((resolve, reject) => {
//         fetch(`${domainPath}/${path}`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'applicaation/json'
//             },
//             body: JSON.stringify(data)
//         })
//             .then((result) => {
//                 resolve(result)
//             }, (err) => {
//                 reject(err)
//             })
//     })
//     return promise
// }

// const DeleteAPI = (path, data) => {
//         const promise = new Promise((resolve, reject) => {
//             fetch(`${domainPath}/${path}/${data}`, { method: 'DELETE' })
//                 .then((result) => {
//                     resolve(result)
//                 }, (err) => {
//                     reject(err)
//                 })
//         })
//         return promise
//     }

const getNewsBlog = () => GetAPI('posts?_sort=id$_order=desc?');
const postNewsBlog = (dataYgDiKirim) => PostAPI('posts', dataYgDiKirim);
const deleteNewsBlog = (dataYgDiHapus) => DeleteAPI('posts', dataYgDiHapus)
const API = {
    getNewsBlog,
    postNewsBlog,
    deleteNewsBlog
}

export default API;