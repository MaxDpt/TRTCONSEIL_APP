const departments = require("../constants/departements-region.json");
const config = require("../constants/config.json")

exports.userLogIn = (email, pass) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/authentification/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                email: email, 
                pass: pass 
            }),
            })
            .then(response => { if (response.ok) {
                return response.json() }; })
            .then(data => { resolve(data) })
            .catch(error => { console.log(error)})
        }
    catch (error){ reject(console.log(error)) }
    }) 
}
exports.getUsers = (token, id, search, offset, status ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/users/${id}`, {
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
exports.getUsers_department = (token, id, postal_code, search, offset, status ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/users_department/${id}`, {
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
exports.getUser = (token, id , userid) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/user/${id}/${userid}`, {
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`}
        })
        .then(response => { if (response.ok) {
            return response.json() } else {return response.json()} })
        .then(data => { resolve(data) })
        .catch(error => { reject(error) })
        }
    catch (error) { console.log(error) } 
}) 
}
exports.getUserRole = (token, id ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/userRole/${id}`, {
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
exports.getUsersToRole = (token, id, role ) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/userToRole/${id}`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                    role: role
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
exports.getProfilImage = (id , file) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/get/file/${id}/${file}`, {
            method: 'GET',
        })
        .then(response => { if (response.ok) {
            return response } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        }
    catch (error) { console.log(error) } 
}) 
}
exports.updateUserState = (token, id , userid, status) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/update/userState/${id}/${userid}`, {
            method: 'PUT',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                status: status, 
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
exports.updateUser = (token, id , form, userRole) => {
    return new Promise(function(resolve, reject) {
    try {
        if (userRole === 'candidate') {
        fetch(`${config.HOST}/api/update/user/${id}`, {
            method: 'PUT',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                name : form.elements[0].value.toLowerCase(),
                last_name: form.elements[1].value.toLowerCase(),
                address: form.elements[2].value.toLowerCase(),
                city: form.elements[3].value.toLowerCase(),
                postal_code: parseInt(form.elements[4].value),
                department: departments[form.elements[4].value].dep_name,
                region: departments[form.elements[4].value].region_name,
                vehicle: form.elements[5].value, 
                phone: parseInt(form.elements[6].value) ? parseInt(form.elements[6].value) : null,
                activity : null,
                siret: null,
            }),
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        } 

        if (userRole === 'recruiter') { 
        fetch(`${config.HOST}/api/update/user/${id}`, {
            method: 'PUT',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                name : form.elements[0].value.toLowerCase(),
                last_name: null,
                address: form.elements[1].value.toLowerCase(),
                city: form.elements[2].value.toLowerCase(),
                postal_code: parseInt(form.elements[3].value),
                department: departments[form.elements[3].value].dep_name,
                region: departments[form.elements[3].value].region_name,
                vehicle: null, 
                phone: parseInt(form.elements[4].value) ? parseInt(form.elements[4].value) : null,
                activity : form.elements[5].value,
                siret: form.elements[6].value,
            }),
        })
        .then(response => { if (response.ok) {
            return response.json() } })
        .then(data => { resolve(data) })
        .catch(error => { reject(error)})
        } 
    } catch (error) { console.log(error) } 
}) 
}
exports.deleteUser = (token, id , userid) => {
    return new Promise(function(resolve, reject) {
    try {
        fetch(`${config.HOST}/api/delete/user/${id}/${userid}`, {
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