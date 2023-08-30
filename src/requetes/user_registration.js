const departments = require("../constants/departements-region.json");
const text = require("../constants/text.json");
const config = require("../constants/config.json")

exports.signInUser = (form, userRole, setErrorForm, setValidation) => {
    return new Promise(function(resolve, reject) {

    if (userRole === 'candidate') {

        // ---> VERIFICATION :
        if (/*NAME*/form.elements[0].value && /*LASTNAME*/form.elements[1].value
        && /*ADDRESS*/form.elements[3].value && /*CITY*/form.elements[4].value
        && /*EMAIL*/form.elements[7].value && /*PASS*/form.elements[8].value) {
        if (/*NAME*/form.elements[0].value.length <= 60) {  if (/*EMAIL*/form.elements[7].value.length <= 260) {
        if (/*PASS*/form.elements[8].value.length <= 60) { if (/*PASS*/form.elements[8].value.length >= 8) { 
        if (/*PASS*/form.elements[8].value.match(/[A-Z]/, 'g')) { if (/*PASS*/form.elements[8].value.match(/[0-9]/, 'g')) 
        {
        
        // ---> REQUEST :
        fetch(`${config.HOST}/api/authentification/signIn`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                name : form.elements[0].value.toLowerCase(),
                last_name: form.elements[1].value.toLowerCase(),
                vehicle: form.elements[2].value.toLowerCase(), 
                address: form.elements[3].value.toLowerCase(),
                city: form.elements[4].value.toLowerCase(),
                postal_code: parseInt(form.elements[5].value),
                department: departments[form.elements[5].value].dep_name,
                region: departments[form.elements[5].value].region_name,
                phone: parseInt(form.elements[6].value) ? parseInt(form.elements[6].value) : 1,
                activity : null,
                siret: null,
                email: form.elements[7].value.toLowerCase(), 
                pass: form.elements[8].value, 
                token: null, 
                role: userRole, 
                status: 'treatment', 
                }),
            })
            .then(response => { return response.json(); })
            .then(data => { resolve(data), setValidation(true) })
            .catch(error => { reject(error) })

        // ---> ERROR FORMULARY :
        } else { setErrorForm(text.Error_Password_Number)}
        } else { setErrorForm(text.Error_Password_Uppercase) }
        } else { setErrorForm(text.Error_Password_Short)}
        } else { setErrorForm('The password field'+text.Error_Text_Length_60)}
        } else { setErrorForm('The email field'+text.Error_Text_Length_260)}
        } else { setErrorForm('The name field'+text.Error_Text_Length_60)}
        } else { setErrorForm(text.Error_Formulary_Empty)}

    }
    if (userRole === 'recruiter') { 
        // ---> VERIFICATION :
        if (/*NAME*/form.elements[0].value && /*SIRET*/form.elements[1].value &&/*ACTIVITY*/form.elements[2].value
            && /*ADDRESS*/form.elements[3].value &&/*CITY*/form.elements[4].value
            && /*EMAIL*/form.elements[7].value && /*PASS*/form.elements[8].value) {
            if (/*NAME*/form.elements[0].value.length <= 60) {  if (/*EMAIL*/form.elements[7].value.length <= 260) {
            if (/*PASS*/form.elements[8].value.length <= 260) { if (/*PASS*/form.elements[8].value.length >= 8) { 
            if (/*PASS*/form.elements[8].value.match(/[A-Z]/, 'g')) { if (/*PASS*/form.elements[8].value.match(/[0-9]/, 'g')) 
            {
            
            // ---> REQUEST :
            fetch(`${config.HOST}/api/authentification/signIn`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    name : form.elements[0].value.toLowerCase(),
                    last_name: null,
                    vehicle: null, 
                    address: form.elements[3].value.toLowerCase(),
                    city: form.elements[4].value.toLowerCase(),
                    postal_code: parseInt(form.elements[5].value),
                    department: departments[form.elements[5].value].dep_name,
                    region: departments[form.elements[5].value].region_name,
                    phone: parseInt(form.elements[6].value) ? parseInt(form.elements[6].value) : 1,
                    activity : form.elements[2].value.toLowerCase(),
                    siret: form.elements[1].value,
                    email: form.elements[7].value.toLowerCase(), 
                    pass: form.elements[8].value, 
                    token: null, 
                    role: userRole, 
                    status: 'treatment', 
                    }),
                })
                .then(response => { return response.json(); })
                .then(data => { resolve(data), setValidation(true) })
                .catch(error => { reject(error) })
    
            // ---> ERROR FORMULARY :
            } else { setErrorForm(text.Error_Password_Number)}
            } else { setErrorForm(text.Error_Password_Uppercase) }
            } else { setErrorForm(text.Error_Password_Short)}
            } else { setErrorForm('The password field'+text.Error_Text_Length_60)}
            } else { setErrorForm('The email field'+text.Error_Text_Length_260)}
            } else { setErrorForm('The name field'+text.Error_Text_Length_60)}
            } else { setErrorForm(text.Error_Formulary_Empty)}
    }
    if (userRole === 'administrator') { 
        if (form.elements[0].value && form.elements[0].value && form.elements[0].value && form.elements[0].value) {
        // ---> REQUEST :
        fetch(`${config.HOST}/api/authentification/signIn`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                name : form.elements[0].value.toLowerCase(),
                last_name: form.elements[1].value.toLowerCase(),
                email: form.elements[2].value.toLowerCase(), 
                pass: form.elements[3].value, 
                role: 'consultant', 
                status: 'approve', 
                }),
            })
            .then(response => { return response.json(); })
            .then(data => { resolve(data) })
            .catch(error => { reject(error) })

        } else {setErrorForm(text.Error_Formulary_Empty)}

    }
    })
}