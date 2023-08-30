import React, {useState, useEffect} from 'react';
import Advertisements_map from '../publications/Adertisement_map';
import Search_Filter from '../utils/Search_Filter';
import Paginations from '../utils/Paginations';

export default function Advertisements_BackOffice(props) {
// ---> Data --------------------------------------------------------------
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [publications, setPublications] = useState(false);
    const [publication, setPublication] = useState(false);
    const [publicationID, setPublicationID] = useState(false);
    const [offsetStat, setOffsetState] = useState(0);
    const [postal_codeStat, setpostal_codeState] = useState(false);
    const [SearchStat, setSearchState] = useState(false);
    const [activityStat, setactivityState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    if (publications) { var totalPage = Math.ceil(parseInt(publications.Count[0].count) / 10); }

// ---> UseEffect ----------------------------------------------------------
    useEffect(() => { getAllPublications() }, []);

// --- > Get Publications :
const getAllPublications = async (Offset, postal_code, activity, Search, state) => {
    if (token) { 
        var status = state ? state : props.params.stateFilter
        var search = Search ? Search : '%'
        var offset = Offset ? Offset : 0
    // ---> No filter :
      if (postal_code === 'false' && activity === 'false' || !postal_code && !activity) {
          const getPublications_request = await props.requests.PublicationsRequests.getPublications(token, id, search, offset, status);
          if (getPublications_request) { setPublications(getPublications_request) }}
    // ---> Activity filter :
      if (postal_code && activity && postal_code === 'false' && activity !== 'false') { 
          const getPublications_activity_request = await props.requests.PublicationsRequests.getPublications_activity(token, id, activity, search, offset, status);
          if (getPublications_activity_request) { setPublications(getPublications_activity_request) }}
    // ---> Department filter :
      if (postal_code && activity && postal_code !== 'false' && activity === 'false') { 
          const getPublications_department_request = await props.requests.PublicationsRequests.getPublications_department(token, id, postal_code, search, offset, status);
          if (getPublications_department_request) { setPublications(getPublications_department_request) }}
    // ---> Department and activity filter :
      if (postal_code && activity && postal_code !== 'false' && activity !== 'false') { 
          const getPublications_activity_department_request = await props.requests.PublicationsRequests.getPublications_activity_department(token, id, postal_code, activity, search, offset, status);
          if (getPublications_activity_department_request) { setPublications(getPublications_activity_department_request)}}
    }
}
// ---> Get Publication ----------------------------------------------------
    const getOnePublication = async (publicationID) => {
    if (publicationID) { 
        const getPublication_request = await props.requests.PublicationsRequests.getPublication(token, id, publicationID);
        if (getPublication_request) { setPublication(getPublication_request) }}
    }

// --- > Upload state filter ------------------------------------------------
const UploadstateFilter = (state) => {
    var Offset = 0
    var postal_code = 'false'
    var activity = 'false'
    var Search = '%'
    props.functions.setStateFilter(state)
    getAllPublications(Offset, postal_code, activity, Search, state)
    
}
// ---> Props ---------------------------------------------------------------
    const functions = {
        getAllPublications: getAllPublications,
        getOnePublication: getOnePublication,
        setPublication: setPublication,
        setPublicationID: setPublicationID,
        setOffsetState: setOffsetState,
        setpostal_codeState,
        setSearchState,
        setactivityState,
        setCurrentPage: setCurrentPage,
        setStateFilter: props.functions.setStateFilter}

    const data = {
        publications: publications.results,
        publication: publication,
        publicationID: publicationID,
        offsetStat: offsetStat,
        postal_codeStat: postal_codeStat,
        SearchStat: SearchStat,
        activityStat: activityStat,
        currentPage: currentPage,
        totalPage: totalPage}

return (
<div>
<div id='nav_title'><p>Publications</p></div>
{/*---> Status filter ------------------------------------------------------ */}
    <div id='stateNav_btn'>
        <button className={`Navbutton ${props.params.stateFilter === 'treatment' ? 'Navbutton_select' : 'Navbutton'}`}
             onClick={() => UploadstateFilter('treatment')} >treatment</button>
        <button className={`Navbutton ${props.params.stateFilter === 'approve' ? 'Navbutton_select' : 'Navbutton'}`} 
             onClick={() => UploadstateFilter('approve')} >approve</button>
    </div>
{/*---> Publications map ---------------------------------------------------- */}
    {!publication && props.params.screenSize === 'Mobile' ||
      props.params.screenSize === 'PC' ? 
    <div id='search_filter_content_down' >
        <Search_Filter functions={functions} data={data} params={props.params} constants={props.constants} />
    </div> : null }

    <div id='publications_list_content'>
    {!publication && props.params.screenSize === 'Mobile' ||
      props.params.screenSize === 'PC' ? 
    <div className={`pagination_content ${props.params.page !== 'advertisements' ? 'pagination_content_down' : 'pagination_content'}`}>
        <Paginations functions={functions} data={data} params={props.params} />
    </div> : null }

    <div id='Advertisement_page_content'>
        <Advertisements_map user={props.user} data={data} params={props.params} functions={functions} requests={props.requests} constants={props.constants}/>
    </div> 

    {publications && publications.results.length >= 5 && props.params.screenSize === 'PC' ||
     publications && publications.results.length >= 5 && !publication && props.params.screenSize === 'Mobile'? 
    <div id='pagination_content_end'>
        <Paginations functions={functions} data={data} params={props.params} />
    </div> : null }
    </div>
</div>
);
};