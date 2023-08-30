import React, {useState, useEffect} from 'react';
import Candidaty_map from '../candidatys/Candidaty_map';
import Search_Filter from '../utils/Search_Filter';
import Paginations from '../utils/Paginations';

export default function Candidatures_BackOffice(props) {
// ---> Data --------------------------------------------------------
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [candidatys, setCandidatys] = useState(false);
    const [candidaty, setCandidaty] = useState(false);
    var [candidatyId, setCandidatyId] = useState(false);
    const [offsetStat, setOffsetState] = useState(0);
    const [postal_codeStat, setpostal_codeState] = useState(false);
    const [SearchStat, setSearchState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    if (candidatys) { var totalPage = Math.ceil(parseInt(candidatys.Count[0].count) / 10); }

// ---> UserEffect ---------------------------------------------------
    useEffect(() => { getAllCandidatys() }, []);

// ---> Get candidatys -----------------------------------------------
    const getAllCandidatys = async (Offset, postal_code, Search, state) => {
        if (token) { 
            var status = state ? state : props.params.stateFilter
            var search = Search ? Search : '%'
            var offset = Offset ? Offset : 0
        // ---> No filter :
          if (postal_code === 'false' || !postal_code) {
              const getCandidatys_request = await props.requests.CandidatysRequests.getCandidatys(token, id, search, offset, status);
              if (getCandidatys_request) { setCandidatys(getCandidatys_request) }}
        // ---> Department filter :
          if (postal_code && postal_code !== 'false') { 
              const getCandidatys_department_request = await props.requests.CandidatysRequests.getCandidatys_department(token, id, postal_code, search, offset, status);
              if (getCandidatys_department_request) { setCandidatys(getCandidatys_department_request) }}
        }
    }
// ---> Get candidaty ------------------------------------------------
    const getOneCandidaty = async (candidatyid) => {
        if (candidatyid) { 
            const candidaty_request = await props.requests.CandidatysRequests.getCandidaty(token, id, candidatyid);
            if (candidaty_request) { setCandidaty(candidaty_request) }}
    }
    
// --- > Upload state filter ------------------------------------------------
const UploadstateFilter = (state) => {
    var Offset = 0
    var postal_code = 'false'
    var Search = '%'
    props.functions.setStateFilter(state)
    getAllCandidatys(Offset, postal_code, Search, state)
    
}
// ---> PROPS ---------------------------------------------------------
    const params = {
        page : props.params.page,
        advertisement_Details: props.params.advertisement_Details,
        profil_page: props.params.profil_page,
        stateFilter: props.params.stateFilter,
        screenSize: props.params.screenSize,
        user_Details: true }

    const data = {
        candidatys: candidatys.results,
        candidaty: candidaty,
        candidatyId: candidatyId,
        offsetStat: offsetStat,
        postal_codeStat: postal_codeStat,
        SearchStat: SearchStat,
        currentPage: currentPage,
        totalPage: totalPage } 

    const functions = {
        setStateFilter: props.functions.setStateFilter,
        getAllCandidatys: getAllCandidatys,
        getOneCandidaty: getOneCandidaty,
        setCandidaty: setCandidaty,
        setCandidatyId: setCandidatyId,
        setOffsetState: setOffsetState,
        setpostal_codeState: setpostal_codeState,
        setSearchState: setSearchState,
        setCurrentPage: setCurrentPage, }
 
return (
<div>
<div id='nav_title'><p>Candidatures</p></div>
{/*---> Status filter ------------------------------------------------------ */}
    <div id='stateNav_btn'>
        <button className={`Navbutton ${props.params.stateFilter === 'treatment' ? 'Navbutton_select' : 'Navbutton'}`}
             onClick={() => UploadstateFilter('treatment')} >treatment</button>
        <button className={`Navbutton ${props.params.stateFilter === 'approve' ? 'Navbutton_select' : 'Navbutton'}`} 
             onClick={() => UploadstateFilter('approve')} >approve</button>
    </div>
{/*---> Candidaty map ------------------------------------------------------- */}
    {!candidaty && props.params.screenSize === 'Mobile' ||
      props.params.screenSize === 'PC' ? 
    <div id='search_filter_content_down' >
        <Search_Filter functions={functions} data={data} params={props.params} constants={props.constants}/>
    </div> : null }

    <div id='publications_list_content'>
    {!candidaty && props.params.screenSize === 'Mobile' ||
      props.params.screenSize === 'PC' ? 
    <div className={`pagination_content ${props.params.page !== 'advertisements' ? 'pagination_content_down' : 'pagination_content'}`}>
            <Paginations functions={functions} data={data} params={props.params} />
    </div> : null }
    
    <div id='Advertisement_page_content'>
        <Candidaty_map user={props.user} data={data} params={params} functions={functions} requests={props.requests} constants={props.constants} />
    </div> 

    {candidatys && candidatys.results.length >= 5 && props.params.screenSize === 'PC' ||
     candidatys && candidatys.results.length >= 5 && !candidaty && props.params.screenSize === 'Mobile'? 
    <div id='pagination_content_end'>
        <Paginations functions={functions} data={data} params={props.params} />
    </div> : null }
    </div>
</div>
    );
};