const config = require("../constants/config.json")

exports.getFavoritesByUser = (token, id ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/favorites/${id}`, {
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`}
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.getFavorite = (token, id, favoriteid ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/favorite/${id}/${favoriteid}`, {
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`}
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.setFavorite = (token, id, publication, stores, secure ) => {
    return new Promise(function(resolve, reject) {
    try {
        // ---> REQUEST :
        fetch(`${config.HOST}/api/set/favorite/${id}`, {
            method: 'POST',
            headers:  {  'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                publication, stores, secure 
                }),
            })
            .then(response => { if (response.ok) {
                return response.json() } })
            .then(data => { resolve(data) })
            .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.deleteFavorite = (token, id, publicationid ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/delete/favorite/${id}/${publicationid}`, {
            method: 'DELETE',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`}
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}

