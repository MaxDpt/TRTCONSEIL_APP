const config = require("../constants/config.json")

exports.getPublications = (token, id, search, offset, status ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/publications/${id}`, {
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
exports.getPublications_department = (token, id, postal_code, search, offset, status ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/publications_department/${id}`, {
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
exports.getPublications_activity = (token, id, activity, search, offset, status ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/publications_activity/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                status: status,
                activity: activity,
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
exports.getPublications_activity_department = (token, id, postal_code, activity, search, offset, status ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/publications_activity_department/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                status: status,
                postal_code: postal_code,
                activity: activity,
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
exports.getPublicationsByUser = (token, id, status, offset ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/publications_user/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                status: status,
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
exports.getPublication = (token, id, publicationID ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/publication/${id}/${publicationID}`, {
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
exports.setPublication = (token, id, form, storeid, userRole ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/set/publication/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                activity: form.elements[0].value,
                contract: form.elements[1].value,
                salary: parseInt(form.elements[3].value),
                hourly: parseInt(form.elements[2].value),
                details: form.elements[4].value,
                store: parseInt(storeid),
                status: 'treatment',
                secure: userRole,
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
exports.updatePublicationState = (token, id, publicationid, status  ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/update/publication/${id}/${publicationid}`, {
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
exports.deletePublicationState = (token, id, publicationid ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/delete/publication/${id}/${publicationid}`, {
            method: 'DELETE',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}