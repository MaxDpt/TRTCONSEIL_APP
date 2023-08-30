const config = require("../constants/config.json")

exports.getCandidatys = (token, id, search, offset, status ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/candidatys/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                status: status,
                search: search,
                offset: parseInt(offset)
            })
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.getCandidatys_department = (token, id, postal_code, search, offset, status ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/candidatys_department/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                status: status,
                postal_code: parseInt(postal_code),
                search: search,
                offset: parseInt(offset)
            })
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.getCandidatysByUser = (token, id ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/candidatys_user/${id}`, {
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
exports.getCandidatysByUser_ForCandidate = (token, id ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/candidatys_user_candidate/${id}`, {
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
exports.getCandidatysByPublicationUser = (token, id ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/candidatys_user_publication/${id}`, {
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
exports.getCandidaty = (token, id , candidatyid) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/candidaty/${id}/${candidatyid}`, {
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
exports.getCandidaty_ForCandidate = (token, id , candidatyid) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/candidaty_candidate/${id}/${candidatyid}`, {
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
exports.setCandidaty = (token, id, publications, stores, status, secure) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/set/candidaty/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ publications, stores, status, secure })
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.updateCandidatyState = (token, id, publicationid, status  ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/update/candidaty_state/${id}/${publicationid}`, {
            method: 'PUT',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ status })
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.deleteCandidaty = (token, id, publicationid  ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/delete/candidaty/${id}/${publicationid}`, {
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