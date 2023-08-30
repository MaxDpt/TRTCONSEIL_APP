
import React, {useState} from 'react';
import departments from "../constants/departements-region.json"
import {signInUser} from "../requetes/user_registration";

export default function Registration() {
// ----- DATA ------------------------------------- 
    const [userRole, setRole] = useState('candidate');
    const [errorForm, setErrorForm] = useState(false);
    const [validation, setValidation] = useState(false);

// ----- CREER UN UTILISATEUR --------------------  
    const createUser = async () => {
        let form = document.querySelector('form');
        await signInUser(form, userRole, setErrorForm, setValidation);
        form.reset();
    } 
     
return (
    <div id='Registration_page'>
    {validation === false ? <>
        <div id='Registration_content'>
        <div id='registrationHeader'><p>REGISTRATION</p></div>

        {/* -- FORMULARY SWITCH CANDIDATE / RECRUITER ------ */}
        <div id='Registration_nav'>
            <button className={`nav_btn ${userRole === 'candidate' ? 'btn_selected' : 'nav_btn'}`} 
              type='radio' name='role' onClick={() => {setRole('candidate'), setErrorForm(false)}} > Candidate </button>

            <button className={`nav_btn ${userRole === 'recruiter' ? 'btn_selected' : 'nav_btn'}`}
              type='radio' name='role' onClick={() => {setRole('recruiter'), setErrorForm(false)}} > Recruiter </button>
        </div>

        <br /><br />

        {/* -- FORMULARY CANDIDATE  ------------------------ */}
        <form id='Registration_form'>

        {userRole === 'candidate' ? <> 
            <label>Prenom : *</label> 
            <input id='name' type='text' /> 
            <label>Nom : * </label> 
            <input id='last_name' type='text' /> 
            <label> Permis de conduire : *</label> 
            <select id='vehicle' type='text' > 
                <option value='Permis-B'>Permis-B</option>
                <option value='Aucun'> -------- Aucun -------- </option>
            </select>

        {/* -- FORMULARY RECRUITER  ------------------------ */}
        </> : userRole === 'recruiter' ? <>
            <label>Entreprise : *</label> 
            <input id='name' type='text' /> 
            <label>N° Siret : *</label> 
            <input id='siret' type='text' /> 
            <label>Secteur d'activité : *</label> 
            <input id='activity' type='text' /> 
        </> : null}

        {/* -- FORMULARY CANDIDATE AND RECRUITER  ---------- */}
            <label>Addresse : *</label>
            <input id='address' type='text' /> 
            <label>Ville : *</label> 
            <input id='city' type='text' />
            <label>Departement : *</label> 
            <select id='postal_code' > 
            {departments.map(result =>  
                <option key={'option'+result.num_dep} value={result.num_dep} >{result.num_dep + ' - '+ result.dep_name+' '+ result.region_name }</option>
            )}
            </select> 
            <label>Phone : </label> 
            <input id='phone' />
            <label>Email : *</label> 
            <input id='email' type='email' />
            <label>Mot de passe : *</label> 
            <input id='pass' type='text' /> 

            <p> * Champs obligatoire.</p>

        {/* -- REGISTRATION BUTTON  ------------------------ */}
            <div type='submit' id='button' onClick={createUser}> <p>register</p> </div>
        </form>
        {/* -- ERROR MESSAGE  ------------------------------ */}
        {errorForm ? <p>{errorForm}</p> : null}
        </div>

        </> : <div id='Form_comfirmation'>
                <p>Formulaire envoyé avec succès !</p>
                <p>Un email de confirmation vous à été envoyé.</p>
                <p>Votre demande d'inscription sera traitée dans les 24h.</p>
              </div>}
    </div>
);
};
    
