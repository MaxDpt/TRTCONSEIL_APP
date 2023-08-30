import React, {useState, useEffect} from 'react';
import Stores_list from '../recruiters/Stores_list';
import Profil_info_details from './Profil_info_details';
import Profil_info_edit from './Profil_info_edit';
import PDF_View from '../candidates/PDF_view';

export default function Profil_info(props) {
var userClass = props.userClass[0]
const [editUser, setEditUser] = useState(false)
const [openCv, setOpenCv] = useState(false)

let functions = {
    setEditUser: setEditUser,
    getUserId: props.functions.getUserId,
    setOpenCv: setOpenCv
}
let data = {
    editUser: editUser,
    openCv: openCv
}

return (
<div id='Profil_info_content'>
{props.userClass ? <div id="info_content">
{/* -- ------------------------- CANDIDATES ------------------------ */}
  {props.userClass[0].u_role === 'candidate' ? <div id='info_content_page_candidate'>
  {props.params.screenSize === 'PC' || props.params.screenSize === 'Mobile' && !openCv ?
  <div id='info_list'>
    {/* -- USER INFORMATIONS ------------------------ */}
    {!editUser ? <Profil_info_details userClass={userClass} functions={functions} data={data} requests={props.requests} constants={props.constants}/> : null }
    {/* -- USER EDIT FORM ------------------------ */}
    {editUser ? <Profil_info_edit userClass={userClass} functions={functions} data={data} requests={props.requests} constants={props.constants}/> : null }
  </div> : null }
    <PDF_View userClass={userClass} data={data} params={props.params} functions={functions} requests={props.requests} constants={props.constants}/>
  </div> : null } 

{/* -- ------------------------- RECRUITERS ------------------------ */}
  {props.userClass[0].u_role === 'recruiter' ? <div id='info_content_page'>
      <div id='info_list'>
      {/* -- STORE LIST / STORE FORM ------------------------ */}
        <Stores_list data={data} params={props.params} userClass={userClass} functions={functions} requests={props.requests} constants={props.constants} />
      </div> <div>
  </div> </div> : null }
  </div> : null}

</div>
);
};
    
