import { useState } from "react"

export default function Advertisements_details(props) {
/* ----- DATA -----------------------------------------*/
const text = props.constants.text
var token = sessionStorage.getItem('token')
var id = sessionStorage.getItem('id')
const [postulate, setPostulate] = useState(false);
const [messageConfirm, setMessageConfirm] = useState(text.Text_Postulate);
var publication0 = props.data.publication[0]

/* ----- POSTULATE ------------------------------------*/
const Postulate = async () => {
    /* ----- DATA -----*/
    var publications = parseInt(publication0.p_id)
    var stores = parseInt(publication0.s_id)
    var status = 'treatment'
    var secure = props.user[0].u_role
    var verify = false;
    const getCandidatysByUser_request = await props.requests.CandidatysRequests.getCandidatysByUser(token, id)
    /* -> VERIFY CANDIDATY ------  */    
    for (var i = 0; i < getCandidatysByUser_request.length ; i ++) {
        if (getCandidatysByUser_request[i].c_publications === publications) {
            verify = true; } 
    }
    /* ----- REQUEST -----*/
    if (verify == false) {
        await props.requests.CandidatysRequests.setCandidaty(token, id, publications, stores, status, secure);
        setPostulate(false);
    } else { setMessageConfirm(text.Error_Postulate) }
}

return (
    <div className={`Advertisements_details ${props.params.profil_page === true && props.params.page !== 'favorite' ||
                                              props.params.page === 'back-office' ? 
                    'Advertisements_details_small' : props.params.profil_page === true && props.params.page === 'favorite' ?
                    'Advertisements_details_middle' : 'Advertisements_details'}`} >
    {publication0 ? 
    <div id="Advertisements_details_content">
    {/* ---- ADVERTISEMENT HEADER ----------------------------------------- */}
        <div id="Advertisements_details_header">
        <p>{publication0.s_name.toUpperCase()}</p>
            {props.user[0].u_role === 'candidate' && props.params.page !== 'candidaty' ? 
                <button className={`'Advertisements_details_Postulate' ${props.params.page === 'favorite' ? 'Advertisements_details_Postulate_middle' : 'Advertisements_details_Postulate'}`}
                  onClick={() => {setPostulate(true)}} >Postulate</button>  : null}
        </div>
    {/* ---- ADVERTISEMENT INFO ----------------------------------------- */}
        <div id="Advertisements_details">
        <div id="Advertisements_details_info"> 
            <div id="Advertisements_details_left"> 
            <p>Business: {publication0.u_name.toUpperCase()}</p> <p>Store: {publication0.s_name.toUpperCase()}</p>
            <p>{publication0.s_address}<br/>{publication0.s_city+' '+publication0.s_postal_code+' '+publication0.s_department}<br/>{publication0.s_region} </p>
            </div>
            <div id="Advertisements_details_right"> 
            <p>JOB INFORMATIONS</p>
            <p>Activity:  {publication0.p_activity.toUpperCase()}</p>
            <p>Contract:  {publication0.p_contract}{' / '}{publication0.p_hourly+' '+'hours'}</p>
            <p>Salary: {publication0.p_salary} € euros HT</p>
            </div>
        </div>
    {/* ---- ADVERTISEMENT DETAILS ----------------------------------------- */}
        <div className={`Advertisements_details_details ${props.params.profil_page === true ? 'Advertisements_details_details_small' : 'Advertisements_details_details'}`}>
            <div id="text"><p>{publication0.p_details}</p></div>
        </div>
        </div>
    {/* ---- POSTULATE CONFIRMATION ----------------------------------------- */}
        {postulate == true ?
        <div id="confirmation"> 
            <div id="confirmation_content"> 
            <div id="title"><h1>CONFIRMATION</h1></div>
            <p>{messageConfirm}</p>
            <div id="confirmation_content_btns">
                <button  onClick={() => {setPostulate(false),setMessageConfirm(text.Text_Postulate) }} >Cancel</button>               
                { messageConfirm !== text.Error_Postulate ? <button  onClick={() => {Postulate()}} >confirm</button> : null }
            </div>
        </div></div> : null } 

        
    </div>
    : null } 
    </div>
);
};
    
