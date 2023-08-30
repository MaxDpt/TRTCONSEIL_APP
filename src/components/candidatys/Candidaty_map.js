import React, {useState} from 'react';
import Candidaty_Details from "../candidatys/Candidaty_details"
import Icon_close from '../icons/Icone_close';
import Icon_Approve from '../icons/Icon_Approve';
import Icon_Reject from '../icons/Icon_Reject';

export default function Candidaty_map(props) {
    var text = props.constants.text
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [confirmation, setConfirmation] = useState(false);
    const [messageConfirm, setMessageConfirm] = useState(false);
    var ArrayDate = {}

/* ----- DATE FORMAT ----------------------------------*/
if (props.data.candidatys) {
    for (var i = 0; i < props.data.candidatys.length; i ++ ) {
        /* ----- DATA -----*/
        var date = new Date((props.data.candidatys[i].c_created_at));
        const day = date.getUTCDate()+1;
        const mount = date.getUTCMonth();
        const year = date.getUTCFullYear();
        var format = new Date(year, mount, day)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        const created_at = format.toLocaleDateString('en', options)
        /* ----- CONSTRUCTION -----*/
        ArrayDate[props.data.candidatys[i].c_id] = created_at } 
}

/* ----- UPDATE CANDIDATY WITH ID --------------------------  */
const updateState_Candidaty = async (candidatyId) => {
    const status = 'approve';
    await props.requests.CandidatysRequests.updateCandidatyState(token, id, candidatyId, status);
    props.functions.getAllCandidatys();
}
/* ----- DELETE CANDIDATY WITH ID --------------------------  */
const delete_Candidaty = async (candidatyId) => {
    await props.requests.CandidatysRequests.deleteCandidaty(token, id, candidatyId);
    props.functions.getAllCandidatys()
}
    
return (
<div className={`Users_map_content ${props.params.page === 'back-office' ? 'Users_map_content_down' : 'Users_map_content'}`}>
{/* -- CANDIDATY MAP BACK-OFFICE ------------------------------------ */}
{props.data.candidatys && props.params.screenSize === 'PC' || 
 props.data.candidatys && props.params.screenSize === 'Mobile' && !props.data.candidaty ? 
    <div id="users_map"> {props.data.candidatys.map(result=> 
    <div onClick={() => {props.functions.getOneCandidaty(result.c_id)}} key={'divClick'+result.u_id}>
    
    {result.c_status === props.params.stateFilter ? 
    <div className={`'users_rows' ${props.data.candidaty && props.data.candidaty[0].c_id === result.c_id ? 'users_rows_select' : 'users_rows'}`}>
        <div id='row_title'>
        <div id='candidaty_row_title'>
        <p key={'result'+result.u_id+'name'}>{result.u_name.toUpperCase()+' '}{result.u_last_name ? result.u_last_name.toUpperCase() : null }</p>
        </div>

    {/* -- BUTTON MAP ------------------------------------ */}
        <div id='users_btns'>
        {props.user && props.user[0].u_role === 'consultant' && result.c_status !== 'approve' || props.user && props.user[0].u_role === 'administrator' && result.c_status !== 'approve' ? 
            <button key={'result'+result.u_id+'button3'} onClick={() => { setConfirmation(true), setMessageConfirm(text.Text_Approve_Candidaty), props.functions.setCandidatyId(result.c_id)   }}><Icon_Approve/></button> : null}
        {props.user && props.user[0].u_role === 'consultant' && result.c_status !== 'approve' || props.user && props.user[0].u_role === 'administrator' && result.c_status !== 'approve'? 
            <button key={'result'+result.u_id+'button4'} onClick={() => { setConfirmation(true), setMessageConfirm(text.Text_Reject_Candidaty), props.functions.setCandidatyId(result.c_id)   }}><Icon_Reject/></button> : null}  
        </div> 
        </div>
        
        <div id='row_detail'>
        <p key={'result'+result.u_id+'store'}>{result.s_name.toUpperCase()} </p>
        <p key={'result'+result.u_id+'job1'}>{result.p_activity.toUpperCase()} </p>
        <p key={'result'+result.u_id+'job2'}>{result.p_contract.toUpperCase()+' / '+result.p_hourly+'H'} </p>
        </div>
        <div id='row_date'>
        <p key={'result'+result.u_id+'date'}>{'Posted on: '+ArrayDate[result.c_id]} </p>
        </div>
    </div> : null }
    </div>  )}

    {/* -- CONFIRMATION ------------------------------------ */}
    {confirmation == true ?
    <div id="confirmation"> 
        <div id="confirmation_content"> 
        <div id="title"><h1>CONFIRMATION</h1></div>
        <p>{messageConfirm}</p>
        <div id="confirmation_content_btns">
            <button  onClick={() => {setConfirmation(false) }} >Cancel</button>               
            {messageConfirm == text.Text_Reject_Candidaty ? <button  onClick={() => {setConfirmation(false), delete_Candidaty(props.data.candidatyId)}} >confirm</button> : null }
            {messageConfirm == text.Text_Approve_Candidaty ? <button  onClick={() => {setConfirmation(false), updateState_Candidaty(props.data.candidatyId)}} >confirm</button> : null }
        </div>
    </div></div> : null } 
        </div> : null }

{/* -- ADVERTISEMENTS RESULT DETAILS ------------------------------------ */}
{ props.data.candidaty ?
        <Candidaty_Details data={props.data} user={props.user} params={props.params} functions={props.functions} constants={props.constants} />
: null}

{props.data.candidaty ? <button className={`'candidaty_close' ${props.params.page === 'back-office' ? 'candidaty_close_down' : 'candidaty_close'}`}
 onClick={() => {props.functions.setCandidaty(false) } }> <Icon_close id='icon_close'/> </button> : null }

{props.params.screenSize === 'PC' ? <div className={`Users_details_Empty ${props.params.profilPage === true ? 'Users_details_Empty_small' : 'Users_details_Empty'}`}></div> : null }

</div>
);
};