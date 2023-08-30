
import React, {useState, useEffect} from 'react';
import { getUser } from '../requetes/user_request';
import UsersRequests from "../requetes/user_request";
import CandidatysRequests from "../requetes/candidaty_request";
import PublicationsRequests from "../requetes/publication_request";
import FavoritesRequests from '../requetes/favorites_request';
import StoresRequests from "../requetes/stores_request";
import FilesRequests from "../requetes/files_request";
import text from '../constants/text.json';
import config from '../constants/config.json';
import jobs from '../constants/jobs.json';
import departments from '../constants/departements-region.json';
import Profil_info from '../components/profil/Profil_info';
import Candidatures_candidate from '../components/candidates/Candidatures_candidate';
import Favorites_candidate from '../components/candidates/Favorites_candidate';
import Candidatures_recruiters from '../components/recruiters/Candidatures_recruiters';
import Advertisements_recruiters from '../components/recruiters/Advertisements_recruiters';

export default function Profil() {
var token = sessionStorage.getItem('token')
var id = sessionStorage.getItem('id')
const [profilNav, setProfilNav] = useState('Informations')
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
        const user_request = await getUser(token, id, userid);
        if (user_request) { setUser(user_request) }
    }
}
// ---> PROPS ---------------------------------------
const params = {
    advertisement_Details: true,
    profil_page: true,
    stateFilter: stateFilter,
    screenSize: screenSize
}
const functions = {
    setStateFilter: setStateFilter,
    getUserId: getUserId,
}
const requests = {
    UsersRequests: UsersRequests,
    CandidatysRequests: CandidatysRequests,
    PublicationsRequests: PublicationsRequests,
    FavoritesRequests: FavoritesRequests,
    FilesRequests: FilesRequests,
    StoresRequests: StoresRequests
}
const constants = {
    text: text,
    config: config,
    jobs: jobs,
    departments: departments
}

return (
<div>
<h1>Profil</h1>
{/* ----- CANDIDATE ----------------------------------------- */}
{ user && user[0].u_role === 'candidate' ?  
<div id='Profil_nav'>           
    <button className={`Navbutton ${profilNav === 'Informations' ? 'Navbutton_select' : 'Navbutton'}`}
            onClick={() => setProfilNav('Informations')} >Informations</button>
    <button className={`Navbutton ${profilNav === 'Candidatures' ? 'Navbutton_select' : 'Navbutton'}`} 
            onClick={() => setProfilNav('Candidatures')} >Candidatures</button>
    <button className={`Navbutton ${profilNav === 'Favorites' ? 'Navbutton_select' : 'Navbutton'}`} 
            onClick={() => setProfilNav('Favorites')} >Favorites</button>
</div> : null }

{ user && user[0].u_role  === 'candidate' ? 
<div id='Profil_content'>
    { profilNav && profilNav === 'Informations' ? <Profil_info params={params} userClass={user} functions={functions} requests={requests} constants={constants}/> : null }
    { profilNav && profilNav === 'Candidatures' ? <Candidatures_candidate functions={functions} userClass={user} params={params} user={user} requests={requests} constants={constants} /> : null }
    { profilNav && profilNav === 'Favorites' ? <Favorites_candidate  userClass={user} functions={functions} params={params} user={user} requests={requests} constants={constants} /> : null }
</div> : null }

{/* ----- RECRUITER ----------------------------------------- */}
{ user && user[0].u_role  === 'recruiter' ?  
    <div id='Profil_nav'>           
        <button className={`Navbutton ${profilNav === 'Informations' ? 'Navbutton_select' : 'Navbutton'}`}
            onClick={() => setProfilNav('Informations')} >Informations</button>
        <button className={`Navbutton ${profilNav === 'Advertisements' ? 'Navbutton_select' : 'Navbutton'}`} 
            onClick={() => setProfilNav('Advertisements')} >Advertisements</button>
        <button className={`Navbutton ${profilNav === 'Candidatures' ? 'Navbutton_select' : 'Navbutton'}`} 
            onClick={() => setProfilNav('Candidatures')} >Candidatures</button>
    </div> : null }
    
{ user && user[0].u_role  === 'recruiter' ? 
<div id='Profil_content'>
    { profilNav && profilNav === 'Informations' ? <Profil_info params={params} userClass={user} functions={functions} requests={requests} constants={constants}/> : null }
    { profilNav && profilNav === 'Advertisements' ? <Advertisements_recruiters params={params} userClass={user} user={user} requests={requests} constants={constants}/> : null }
    { profilNav && profilNav === 'Candidatures' ? <Candidatures_recruiters params={params} userClass={user} requests={requests} constants={constants}/> : null }
</div> : null }

</div>
);
};
    
