import React, {useState, useEffect} from 'react';
import Users_map from '../user/Users_map';
import Search_Filter from '../utils/Search_Filter';
import Paginations from '../utils/Paginations';

export default function Inscriptions_BackOffice(props) {
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [users, setUsers] = useState(false);
    const [user, setUser] = useState(false);
    const [userID, setUserID] = useState(false);
    const [offsetStat, setOffsetState] = useState(0);
    const [postal_codeStat, setpostal_codeState] = useState(false);
    const [SearchStat, setSearchState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    if (users) { var totalPage = Math.ceil(parseInt(users.Count[0].count) / 10); }

// ------ USE EFFECT -------------------------------  
    useEffect(() => { getAllUsers() }, []);

// ---> GET ALL USERS ------------------------------
    const getAllUsers = async (Offset, postal_code, Search, state) => {
        if (token) { 
            var status = state ? state : props.params.stateFilter
            var search = Search ? Search : '%'
            var offset = Offset ? Offset : 0
        // ---> No filter :
          if (postal_code === 'false' || !postal_code) {
              const getUsers_request = await props.requests.UsersRequests.getUsers(token, id, search, offset, status);
              if (getUsers_request) { setUsers(getUsers_request) }}
        // ---> Department filter :
          if (postal_code && postal_code !== 'false') { 
              const getUsers_department_request = await props.requests.UsersRequests.getUsers_department(token, id, postal_code, search, offset, status);
              if (getUsers_department_request) { setUsers(getUsers_department_request) }}
        }
    }
// ---> GET ONE USER -------------------------------
    const getOneUser = async (userid) => {
        if (userid) { 
            const user_request = await props.requests.UsersRequests.getUser(token, id, userid);
            if (user_request) { setUser(user_request) }
        }
    }
// --- > Upload state filter ------------------------------------------------
const UploadstateFilter = (state) => {
    var Offset = 0
    var postal_code = 'false'
    var Search = '%'
    props.functions.setStateFilter(state)
    getAllUsers(Offset, postal_code, Search, state)
    
}
// ---> PROPS --------------------------------------
    const params = {
        page : props.params.page,
        advertisement_Details: props.params.advertisement_Details,
        profil_page: props.params.profil_page,
        stateFilter: props.params.stateFilter,
        screenSize: props.params.screenSize,
        user_Details: true
    }
    const data = {
        users: users.results,
        user: user,
        userID: userID,
        offsetStat: offsetStat,
        postal_codeStat: postal_codeStat,
        SearchStat: SearchStat,
        currentPage: currentPage,
        totalPage: totalPage 
    }
    const functions = {
        setStateFilter: props.setStateFilter,
        getAllUsers: getAllUsers,
        setUser: setUser,
        setUserID: setUserID,
        getOneUser: getOneUser,
        setOffsetState: setOffsetState,
        setpostal_codeState: setpostal_codeState,
        setSearchState: setSearchState,
        setCurrentPage: setCurrentPage,
    }

    return (
    <div>
        <div id='nav_title'><p>Registrations</p></div>
        <div id='stateNav_btn'>
        <button className={`Navbutton ${props.params.stateFilter === 'treatment' ? 'Navbutton_select' : 'Navbutton'}`}
             onClick={() => UploadstateFilter('treatment')} >treatment</button>
        <button className={`Navbutton ${props.params.stateFilter === 'approve' ? 'Navbutton_select' : 'Navbutton'}`} 
             onClick={() => UploadstateFilter('approve')} >approve</button>
        </div>

        {!user && props.params.screenSize === 'Mobile' ||
          props.params.screenSize === 'PC' ? 
        <div id='search_filter_content_down' >
            <Search_Filter functions={functions} data={data} params={props.params} constants={props.constants}/>
        </div> : null }

        <div id='publications_list_content'>
        {!user && props.params.screenSize === 'Mobile' ||
          props.params.screenSize === 'PC' ? 
        <div className={`pagination_content ${props.params.page !== 'advertisements' ? 'pagination_content_down' : 'pagination_content'}`}>
            <Paginations functions={functions} data={data} params={props.params} />
        </div> : null }

        <div id='Advertisement_page_content'>
            <Users_map data={data} functions={functions} user={props.user} params={params} requests={props.requests} constants={props.constants} />
        </div> 

        {users && users.results.length >= 5 && props.params.screenSize === 'PC' ||
         users && users.results.length >= 5 && !user && props.params.screenSize === 'Mobile' ? 
        <div id='pagination_content_end'>
            <Paginations functions={functions} data={data} params={props.params} />
        </div> : null }
        </div>
    </div>
    );
};
    
