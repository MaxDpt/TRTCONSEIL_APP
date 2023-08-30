
import React, {useState, useEffect} from 'react';

import Advertisements_map from '../publications/Adertisement_map';
import Advertisements_form from './Advertisements_form';
import Paginations from '../utils/Paginations';

export default function Advertisements_recruiters(props) {
    const [advertisementPage, setadvertisementPage] = useState('list');
    const [stateFilter, setStateFilter] = useState('approve');
    

    /* ----- DATA ---------------------------------------  */
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [publications, setPublications] = useState(false);
    const [publication, setPublication] = useState(false);
    const [publicationID, setPublicationID] = useState(false);
    var screenSize = false
    if (window.screen.width >= 850) { var screenSize = 'PC' }
    if (window.screen.width <= 850) { var screenSize = 'Mobile' }
    const [offsetStat, setOffsetState] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    if (publications) { var totalPage = Math.ceil(parseInt(publications.Count[0].count) / 10); }

// ---> useEffect :
    useEffect(() => { getAllPublications() }, []);

// --- > Get Publications :
    const getAllPublications = async (state, Offset) => {
        var status = state ? state : stateFilter
        var offset = Offset ? Offset : 0
        if (token) { 
            const getPublications_request = await props.requests.PublicationsRequests.getPublicationsByUser(token, id, status, offset);
            if (getPublications_request) { setPublications(getPublications_request) }
        }
    }
// --- > Get Publication :
    const getOnePublication = async (publicationID) => {
        if (publicationID) { 
            const getPublication_request = await props.requests.PublicationsRequests.getPublication(token, id, publicationID);
            if (getPublication_request) { setPublication(getPublication_request) }
    }
}
// --- > Upload state filter ------------------------------------------------
const UploadstateFilter = (state) => {
    var Offset = 0
    setStateFilter(state)
    getAllPublications(state, Offset)
    
}
    // ---> PROPS : 
    const params = {
        page :'recruiters',
        advertisement_Details: true,
        profil_page: true,
        stateFilter: stateFilter,
        screenSize: screenSize
    }
    const functions = {
        getAllPublications: getAllPublications,
        getOnePublication: getOnePublication,
        setPublication: setPublication,
        setPublicationID: setPublicationID,
        setOffsetState: setOffsetState,
        setCurrentPage: setCurrentPage,
    }
    const data = {
        publications: publications.results,
        publication: publication,
        publicationID: publicationID,
        offsetStat: offsetStat,
        currentPage: currentPage,
        totalPage: totalPage
    }

    return (
    <div id='Advertisements_recruiter'>
        <div id='nav_title'><p>Publications</p></div>
    {/* ----- ADVERTISEMENT MAP --------------------------- */}
        <div id='stateNav_btn'>
            <button className={`Navbutton ${stateFilter === 'treatment' && advertisementPage === 'list' ? 'Navbutton_select' : 'Navbutton'}`}
                onClick={() => {UploadstateFilter('treatment'), setadvertisementPage('list')}} >treatment</button>
            <button className={`Navbutton ${stateFilter === 'approve' && advertisementPage === 'list' ? 'Navbutton_select' : 'Navbutton'}`} 
                onClick={() => {UploadstateFilter('approve'), setadvertisementPage('list')}} >approve</button>
            <button className={`Navbutton ${advertisementPage === 'create' ? 'Navbutton_select' : 'Navbutton'}`} 
                onClick={() => {setadvertisementPage('create')}} >create</button>
        </div>

    {advertisementPage === 'list' ? <>

    {!publication && screenSize === 'Mobile' || 
              screenSize === 'PC' ? 
            <div className={`pagination_content ${params.page !== 'advertisements' ? 'pagination_content_down' : 'pagination_content'}`}>
                <Paginations functions={functions} data={data} params={params} />
            </div> : null }

            <Advertisements_map user={props.user} data={data} params={params} functions={functions} requests={props.requests} constants={props.constants}/>

            {publications && publications.results.length >= 5 && screenSize === 'PC' ||
             publications && publications.results.length >= 5 && !publication && screenSize === 'Mobile' ? 
            <div id='pagination_content_end'>
                <Paginations functions={functions} data={data} params={params} />
            </div> : null }
    {/* ----- ADVERTISEMENT MAP --------------------------- */}
    </> : advertisementPage === 'create' ? <>
        <Advertisements_form functions= {functions}screenSize={props.params.screenSize} text={props.text} userClass={props.userClass} advertisementPage={advertisementPage} requests={props.requests} constants={props.constants}  />

    </> : null}
    </div>
    );
};