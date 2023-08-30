import React, {useState, useEffect} from 'react';
import Advertisements_map from '../publications/Adertisement_map';

export default function Candidatures_candidate(props) {
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [publications, setPublications] = useState(false);
    const [publication, setPublication] = useState(false);
    const [publicationID, setPublicationID] = useState(false);

    // ---> PROPS ---------------------------------------
    const params = {
        page :'candidaty',
        advertisement_Details: props.params.advertisement_Details,
        profil_page: props.params.profil_page,
        stateFilter: props.params.stateFilter,
        screenSize: props.params.screenSize
    }
    // ---> useEffect :
    useEffect(() => { getAllPublications() }, []);

    // --- > Get Publications :
    const getAllPublications = async () => {
    if (token) { 
        const getPublications_request = await props.requests.CandidatysRequests.getCandidatysByUser_ForCandidate(token, id);
        if (getPublications_request) { setPublications(getPublications_request) }
    }
    }
    // --- > Get Publication :
    const getOnePublication = async (publicationID) => {
    if (publicationID) { 
        const getPublication_request = await props.requests.CandidatysRequests.getCandidaty_ForCandidate(token, id, publicationID);
        if (getPublication_request) { setPublication(getPublication_request) }
    }
    }
    const functions = {
        getAllPublications: getAllPublications,
        getOnePublication: getOnePublication,
        setPublication: setPublication,
        setPublicationID: setPublicationID,
        setStateFilter: props.functions.setStateFilter
    }
    const data = {
        publications: publications,
        publication: publication,
        publicationID: publicationID
    }

    return (
    <div>
        <div id='nav_title'><p>Candidatures</p></div>
        <div id='stateNav_btn'>
        <button className={`Navbutton ${props.params.stateFilter === 'treatment' ? 'Navbutton_select' : 'Navbutton'}`}
             onClick={() => props.functions.setStateFilter('treatment')} >treatment</button>
        <button className={`Navbutton ${props.params.stateFilter === 'approve' ? 'Navbutton_select' : 'Navbutton'}`} 
             onClick={() => props.functions.setStateFilter('approve')} >approve</button>
        </div>

        <Advertisements_map user={props.user} data={data} params={params} functions={functions} requests={props.requests} constants={props.constants}/>
 
    </div>
    );
};