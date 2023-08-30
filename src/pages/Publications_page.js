import React, {useState, useEffect} from 'react';
import text from '../constants/text.json';
import config from '../constants/config.json';
import jobs from '../constants/jobs.json';
import departments from '../constants/departements-region.json';
import Advertisements_map from '../components/publications/Adertisement_map';
import Search_Filter from '../components/utils/Search_Filter';
import Paginations from '../components/utils/Paginations';
import {getUser} from "../requetes/user_request";
import {getPublications ,getPublication, 
        getPublications_department, getPublications_activity, 
        getPublications_activity_department } from "../requetes/publication_request";
import CandidatysRequests from '../requetes/candidaty_request';
import PublicationsRequests from "../requetes/publication_request";
import FavoritesRequests from '../requetes/favorites_request';

export default function Advertisement() {
/* ----- DATA ---------------------------------------  */
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [user, setUser] = useState(false);
    const [publications, setPublications] = useState(false);
    const [publication, setPublication] = useState(false);
    const [publicationID, setPublicationID] = useState(false);
    const [offsetStat, setOffsetState] = useState(0);
    const [postal_codeStat, setpostal_codeState] = useState(false);
    const [SearchStat, setSearchState] = useState(false);
    const [activityStat, setactivityState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    if (publications) { var totalPage = Math.ceil(parseInt(publications.Count[0].count) / 10); }
    const status = 'approve'

    var screenSize = false
    if (window.screen.width >= 850) { var screenSize = 'PC' }
    if (window.screen.width <= 850) { var screenSize = 'Mobile' }

// ---> useEffect :
    useEffect(() => { getUserId(), getAllPublications() }, []);

// --- > Get User :
const getUserId = async () => {
    if (token) { 
        const userid = id;
        const user_request = await getUser(token, id, userid);
        if (user_request) { setUser(user_request) }
    }
}
// --- > Get Publications :
    const getAllPublications = async (Offset, postal_code, activity, Search) => {
        if (token) { 
            var search = Search ? Search : '%'
            var offset = Offset ? Offset : 0
    // ---> No filter :
    if (postal_code === 'false' && activity === 'false' || !postal_code && !activity) {
        const getPublications_request = await getPublications(token, id, search, offset, status);
        if (getPublications_request) { setPublications(getPublications_request) }}
  // ---> Activity filter :
    if (postal_code && activity && postal_code === 'false' && activity !== 'false') { 
        const getPublications_activity_request = await getPublications_activity(token, id, activity, search, offset, status);
        if (getPublications_activity_request) { setPublications(getPublications_activity_request) }}
  // ---> Department filter :
    if (postal_code && activity && postal_code !== 'false' && activity === 'false') { 
        const getPublications_department_request = await getPublications_department(token, id, postal_code, search, offset, status);
        if (getPublications_department_request) { setPublications(getPublications_department_request) }}
  // ---> Department and activity filter :
    if (postal_code && activity && postal_code !== 'false' && activity !== 'false') { 
        const getPublications_activity_department_request = await getPublications_activity_department(token, id, postal_code, activity, search, offset, status);
        if (getPublications_activity_department_request) { setPublications(getPublications_activity_department_request)}}
        }
    }
// --- > Get Publication :
    const getOnePublication = async (publicationID) => {
        if (publicationID) { 
            const getPublication_request = await getPublication(token, id, publicationID);
            if (getPublication_request) { setPublication(getPublication_request) }
    }
}

// ---> PROPS : 
    const params = {
        page :'advertisements',
        advertisement_Details: true,
        profil_page: false,
        stateFilter: status,
        screenSize: screenSize
    }
    const functions = {
        getAllPublications: getAllPublications,
        getOnePublication: getOnePublication,
        setPublication: setPublication,
        setPublicationID: setPublicationID,
        setOffsetState: setOffsetState,
        setpostal_codeState,
        setSearchState,
        setactivityState,
        setCurrentPage: setCurrentPage
    }
    const data = {
        publications: publications.results,
        publication: publication,
        publicationID: publicationID,
        offsetStat: offsetStat,
        postal_codeStat: postal_codeStat,
        SearchStat: SearchStat,
        activityStat: activityStat,
        currentPage: currentPage,
        totalPage: totalPage
    }
    const requests = {
        PublicationsRequests: PublicationsRequests,
        FavoritesRequests: FavoritesRequests,
        CandidatysRequests: CandidatysRequests
    }
    const constants = {
        text: text,
        config: config,
        jobs: jobs,
        departments: departments
        
    }
        return (
        <div id='Advertisement_page'>
            <h2>Advertisement</h2>

            {!publication && screenSize === 'Mobile' ||
              screenSize === 'PC' ? 
            <div id='search_filter_content'>
                <Search_Filter functions={functions} data={data} params={params} constants={constants}/>
            </div> : null }

            <div id='publications_list_content'>
            {!publication && screenSize === 'Mobile' || 
              screenSize === 'PC' ? 
            <div className={`pagination_content ${params.page !== 'advertisements' ? 'pagination_content_down' : 'pagination_content'}`}>
                <Paginations functions={functions} data={data} params={params} />
            </div> : null }

            <div id='Advertisement_page_content'>
                <Advertisements_map user={user} data={data} params={params} functions={functions} requests={requests} constants={constants} />
            </div> 
            
            {publications && publications.results.length >= 5 && screenSize === 'PC' ||
             publications && publications.results.length >= 5 && !publication && screenSize === 'Mobile' ? 
            <div id='pagination_content_end'>
                <Paginations functions={functions} data={data} params={params} />
            </div> : null }
            </div>

        </div>
        );
};
    
