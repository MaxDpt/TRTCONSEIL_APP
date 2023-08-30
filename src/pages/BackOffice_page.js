
import React, {useState, useEffect} from 'react';
import text from '../constants/text.json';
import config from '../constants/config.json';
import jobs from '../constants/jobs.json';
import departments from '../constants/departements-region.json';
import Advertisements_BackOffice from "../components/backOffice/Advertisements_BackOffice";
import Candidatures_BackOffice from "../components/backOffice/Candidatures_BackOffice";
import Inscriptions_BackOffice from "../components/backOffice/Inscriptions_BackOffice";
import Consultants_BackOffice from '../components/backOffice/Consultants_BackOffice';
import UsersRequests from "../requetes/user_request";
import {signInUser} from "../requetes/user_registration";
import CandidatysRequests from '../requetes/candidaty_request';
import PublicationsRequests from "../requetes/publication_request";
import FavoritesRequests from '../requetes/favorites_request';

export default function BackOffice() {
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [profilNav, setProfilNav] = useState('Inscriptions')
    const [stateFilter, setStateFilter] = useState('treatment')
    const [user, setUser] = useState(false);
    var screenSize = false
    if (window.screen.width >= 850) { var screenSize = 'PC' }
    if (window.screen.width <= 850) { var screenSize = 'Mobile' }

// ---> useEffect ----------------------------------- 
    useEffect(() => { getUserId() }, []);

// --- > Get User -----------------------------------
    const getUserId = async () => {
        if (token) { 
            const userid = id;
            const user_request = await UsersRequests.getUser(token, id, userid);
            if (user_request) { setUser(user_request) }
        }
    }
// ---> PROPS ---------------------------------------
    const params = {
        page :'back-office',
        advertisement_Details: true,
        profil_page: false,
        stateFilter: stateFilter,
        screenSize: screenSize,
        profilNav: profilNav
    }
    const functions = {
        setStateFilter: setStateFilter
    }
    const requests = {
        signInUser: signInUser,
        UsersRequests: UsersRequests,
        CandidatysRequests: CandidatysRequests,
        PublicationsRequests: PublicationsRequests,
        FavoritesRequests: FavoritesRequests
    }
    const constants = {
        text: text,
        config: config,
        jobs: jobs,
        departments: departments
    }

return (
<div>
    <h1>Back Office</h1>
    {user && user[0].u_role === 'administrator' || user && user[0].u_role === 'consultant'? 
    <div id='Profil_nav'>           
        <button className={`Navbutton ${profilNav === 'Inscriptions' ? 'Navbutton_select' : 'Navbutton'}`}
            onClick={() => setProfilNav('Inscriptions')} >Registartions</button>
        <button className={`Navbutton ${profilNav === 'Advertisements' ? 'Navbutton_select' : 'Navbutton'}`} 
            onClick={() => setProfilNav('Advertisements')} >Publications</button>
        <button className={`Navbutton ${profilNav === 'Candidatures' ? 'Navbutton_select' : 'Navbutton'}`} 
            onClick={() => setProfilNav('Candidatures')} >Candidatys</button>
        {user[0].u_role === 'administrator' ? 
        <button className={`Navbutton ${profilNav === 'Consultants' ? 'Navbutton_select' : 'Navbutton'}`} 
            onClick={() => setProfilNav('Consultants')} >Admin</button> : null }
    </div> : null}

    {user && user[0].u_role === 'administrator' ||  user && user[0].u_role === 'consultant' ? 
    <div id='Profil_content'>
        { profilNav && profilNav === 'Inscriptions' ? <Inscriptions_BackOffice user={user} params={params} functions={functions} requests={requests} constants={constants}/> : null }
        { profilNav && profilNav === 'Advertisements' ? <Advertisements_BackOffice user={user} params={params} functions={functions} requests={requests} constants={constants} /> : null }
        { profilNav && profilNav === 'Candidatures' ? <Candidatures_BackOffice user={user} params={params} functions={functions} requests={requests} constants={constants} /> : null }
        { profilNav && profilNav === 'Consultants' ? <Consultants_BackOffice user={user} params={params} functions={functions} requests={requests} /> : null }
    </div> : null}


</div>
);
};
    
