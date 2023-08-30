import React, {useState, useEffect} from 'react';
import Candidaty_map from '../candidatys/Candidaty_map';

    export default function Candidatures_recruiters(props) {
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [candidatys, setCandidatys] = useState(false);
    const [candidaty, setCandidaty] = useState(false);
    var [candidatyId, setCandidatyId] = useState(false);

    /* -> GET CANDIDATY --------------------------  */
useEffect(() => { getAllCandidatys() }, []);

const getAllCandidatys = async () => {
    if (token) { 

        const candidatys_request = await props.requests.CandidatysRequests.getCandidatysByPublicationUser(token, id);
        if (candidatys_request) { setCandidatys(candidatys_request) }
    }
}
const getOneCandidaty = async (candidatyid) => {
    if (candidatyid) { 
        const candidaty_request = await props.requests.CandidatysRequests.getCandidaty(token, id, candidatyid);
        if (candidaty_request) { setCandidaty(candidaty_request) }
    }
}

if (candidaty) {
    console.log(candidaty)
}

// ---> PROPS ---------------------------------------
const params = {
    page : 'recruiter',
    advertisement_Details: props.params.advertisement_Details,
    profil_page: true,
    stateFilter: 'approve',
    screenSize: props.params.screenSize,
    user_Details: true
}
const data = {
    candidatys: candidatys,
    candidaty: candidaty,
    candidatyId: candidatyId
}
const functions = {
    getAllCandidatys: getAllCandidatys,
    getOneCandidaty: getOneCandidaty,
    setCandidaty: setCandidaty,
    setCandidatyId: setCandidatyId
}

        return (
        <div id='candidatures_from_recruiter'>
            <div id='nav_title'><p>Candidatures</p></div>
         <Candidaty_map data={data} user={props.user} params={params} functions={functions} constants={props.constants} />
        </div>
        );
    };
    
