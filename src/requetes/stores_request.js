const departments = require("../constants/departements-region.json");
const config = require("../constants/config.json")

exports.getStoresByUser = (token, id ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/stores_user/${id}`, {
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
exports.getStoreById = (token, id, storeid ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/store/${id}/${storeid}`, {
            method: 'GET',
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
exports.setStore = (token, id, form, userRole ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/set/store/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`}, 
            body: JSON.stringify({
                name: form.elements[0].value,
                address: form.elements[1].value,
                city: form.elements[2].value,
                postal_code: parseInt(form.elements[3].value),
                department: departments[form.elements[3].value].dep_name,
                region: departments[form.elements[3].value].region_name,
                phone: parseInt(form.elements[4].value),
                hourly: form.elements[5].value,
                siren: form.elements[6].value,
                status: 'treatment',
                secure: userRole
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
exports.updateStore = (token, id, storeid, form, userRole ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/update/store/${id}/${storeid}`, {
            method: 'PUT',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`}, 
            body: JSON.stringify({
                name: form.elements[0].value,
                address: form.elements[1].value,
                city: form.elements[2].value,
                postal_code: parseInt(form.elements[3].value),
                department: departments[form.elements[3].value].dep_name,
                region: departments[form.elements[3].value].region_name,
                phone: parseInt(form.elements[4].value),
                hourly: form.elements[5].value,
                siren: form.elements[6].value,
                secure: userRole
            }),
        })
        .then(response => { if (response.ok) {
            return response.text() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}