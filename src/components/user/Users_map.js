import React, {useState} from 'react';
import Users_details from '../user/Users_details';
import Icon_Approve from '../icons/Icon_Approve';
import Icon_Reject from '../icons/Icon_Reject';
import Icon_close from '../icons/Icone_close';

export default function Users_map(props) {
    var text = props.constants.text
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    var [confirmation, setConfirmation] = useState(false);
    var [messageConfirm, setMessageConfirm] = useState(false);

    /* -> UPDATE USER STATUS --------------------------  */
    const updateState_User = async (userid) => {
        const status = 'approve';
        await props.requests.UsersRequests.updateUserState(token, id, userid, status);
        props.functions.getAllUsers();
    }   
    /* -> DELETE USER WHITH ID --------------------------  */
    const delete_User = async (userid) => {
        await props.requests.UsersRequests.deleteUser(token, id, userid);
        props.functions.getAllUsers();
    }   

return (
<div className={`Users_map_content ${props.params.page === 'back-office' ? 'Users_map_content_down' : 'Users_map_content'}`}>
{/* -- USERS MAP BACK-OFFICE ------------------------------------ */}
    {props.data.users && props.params.screenSize === 'PC' || 
     props.data.users && props.params.screenSize === 'Mobile' && !props.data.user ? 
    <div id="users_map"> {props.data.users.map(result=> 
    <div onClick={() => {props.functions.getOneUser(result.u_id)}} key={'div'+result.u_id}>

    {result.u_status === props.params.stateFilter && props.params.page === 'back-office' && result.u_role !== 'administrator' && result.u_role !== 'consultant' ? 
    <div className={`'users_rows' ${props.data.user && props.data.user[0].u_id === result.u_id ? 'users_rows_select' : 'users_rows'}`}>
    <div id='row_title'>
    <div id='user_row_title'>
    {result.u_role === 'candidate' ? <p key={'result'+result.u_id+'name'}>{result.u_name[0].toUpperCase() + result.u_name.slice(1) +' '+
                                                                           result.u_last_name[0].toUpperCase() + result.u_last_name.slice(1)}</p> :
     result.u_role === 'recruiter' ? <p key={'result'+result.u_id+'name'}>{result.u_name[0].toUpperCase() + result.u_name.slice(1) }</p> : null }
    </div>

    {/* -- BUTTON MAP ------------------------------------ */}
    <div id='users_btns'>
    {props.user && props.user[0].u_role === 'consultant' && result.u_status !== 'approve' || props.user && props.user[0].u_role === 'administrator' && result.u_status !== 'approve' ?
    <button key={'result'+result.u_id+'button3'} onClick={() => {setConfirmation(true), props.functions.setUserID(result.u_id), setMessageConfirm(text.Text_Approve_Registration)  }}><Icon_Approve/></button> : null}
    {props.user && props.user[0].u_role === 'consultant' && result.u_status !== 'approve' || props.user && props.user[0].u_role === 'administrator' && result.u_status !== 'approve' ? 
    <button key={'result'+result.u_id+'button4'} onClick={() => {setConfirmation(true), props.functions.setUserID(result.u_id), setMessageConfirm(text.Text_Reject_Registration)   }}><Icon_Reject/></button> : null}  
    </div> 
    </div>

    <div id='row_detail'>
    <p>{result.u_city.toUpperCase()+' - '+result.u_department.toUpperCase()+' - '+result.u_region.toUpperCase()}</p>
    </div>
    <div id='row_date'> 
    <p>{result.u_role}</p>
    </div>
    </div> : null }
    </div>  )} </div> : null }

    {/* -- RESULT DETAILS ------------------------------------ */}
    {props.data.user ? <button className={`'candidaty_close' ${props.params.page === 'back-office' ? 'candidaty_close_down' : 'candidaty_close'}`} 
     onClick={() => {props.functions.setUser(false) } }> <Icon_close id='icon_close'/> </button> : null}
    {props.params.user_Details && props.params.user_Details === true ?
            <Users_details data={props.data} functions={props.functions} params={props.params} />
    : null}
    <div className={`Users_details_Empty ${props.params.profilPage === true ? 'Users_details_Empty_small' : 'Users_details_Empty'}`}></div>

{/* -- CONFIRMATION ------------------------------------ */}
    {confirmation == true ?
    <div id="confirmation"> 
        <div id="confirmation_content"> 
        <div id="title"><h1>CONFIRMATION</h1></div>
        <p>{messageConfirm}</p>
        <div id="confirmation_content_btns">
            <button  onClick={() => {setConfirmation(false) }} >Cancel</button>               
            {messageConfirm == text.Text_Approve_Registration ? <button  onClick={() => {  setConfirmation(false),updateState_User(props.data.userID) }} >confirm</button> : null }
            {messageConfirm == text.Text_Reject_Registration ? <button  onClick={() => {  setConfirmation(false),delete_User(props.data.userID)  }} >confirm</button> : null }
        </div>
    </div></div> : null } 
</div>
);
};
    