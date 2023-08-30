const config = require("../constants/config.json")

exports.updateUserPdf = (token, id, data) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/update/userPdf/${id}`, {
            method: 'PUT',
            headers: {  
                        'Authorization': `Bearer ${token}`},
            body: data
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.updateUserImage = (token, id, data) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/update/userImage/${id}`, {
            method: 'PUT',
            headers: {  
                        'Authorization': `Bearer ${token}`},
            body: data
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}