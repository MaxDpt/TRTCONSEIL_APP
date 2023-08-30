import { useState} from "react";
import Icon_Edit from "../icons/Icon_Edit";
import Icon_Upload from "../icons/Icon_Upload";
import Icon_ben from "../icons/Icon_Ben";

export default function Profil_info_details(props) {
const config = props.constants.config
var token = sessionStorage.getItem('token')
var id = sessionStorage.getItem('id')
var userClass = props.userClass
var url = (config.HOST+"/api/get/file/"+id+"/"+userClass.u_profil_image)
const [filename, setFilename] = useState(false)
if (document.getElementById('image_file')) {
var pdf_file = document.getElementById('image_file'); }

// ---> ON CHANGE FILE :
const onChangeFile = () => {
    if (pdf_file.files) {
        setFilename(pdf_file.files[0].name)
    }
}
// ---> UPDATE IMAGE :
const update_image = async () => {
    if (pdf_file.files) {
    const data = new FormData();
    data.append("data", pdf_file.files[0]) 
        await props.requests.FilesRequests.updateUserImage(token, id, data);
    setFilename(false)
    props.functions.getUserId() }
}

return (
<div>
{/* -- RECRUITER ------------------------ */}
    { userClass && userClass.u_role === 'recruiter' ? <>
    <div id='Profil_info_content_header'>
    {/* -- USER IMAGE BUTTON ------------------------ */}
        {!filename ? <input id="image_file" type="file" onChange={() => {onChangeFile()}}/> : null }
        {!filename ? <div id="imagefileIcon"><Icon_Edit/></div> : null }
        {filename ? <div id="imagefileIcon" onClick={() => {update_image()}} ><Icon_Upload/></div> : null }
        {filename ? <div id="imageDeleteIcon" onClick={() => {setFilename(false)}} ><Icon_ben/></div> : null }
    {/* -- USER IMAGE ------------------------ */}
        <div id='Profil_info_content_perso'>
            {userClass.u_profil_image !== null ? <img id="profilImage" src={url}/> : 
            <div id='p_profilImage_Default'><p>{userClass.u_name[0].toUpperCase()}</p></div> }

            <button id="Profil_edit_btn" onClick={() => {props.functions.setEditUser(true)}} ><Icon_Edit/></button> 
        </div>
    </div>
    <div id='info'>
    {/* -- USER INFORMATIONS ------------------------ */}
        <div id='info_text'>
        <p>{userClass.u_name.toUpperCase()}</p>
        <p>recruiter</p>
        <p>activity area : {' '+userClass.u_activity}</p>
        <div id='contact'> <p>email:{' '+ userClass.u_email}</p> <p>phone: {'+33 '+userClass.u_phone}</p> </div>
        <p>{userClass.u_address}<br/>{userClass.u_city+' '+userClass.u_postal_code+' '+userClass.u_department}<br/>{userClass.u_region}</p>
        <p>N° Siret: {userClass.u_siret}</p>
        </div></div>
    </> : null}

{/* -- CANDIDATE ------------------------ */}
    { userClass && userClass.u_role === 'candidate' ? <>
    <div id='Profil_info_content_header'>
    {/* -- USER IMAGE BUTTON ------------------------ */}
        {!filename ? <input id="image_file" type="file" onChange={() => {onChangeFile()}}/> : null }
        {!filename ? <div id="imagefileIcon"><Icon_Edit/></div> : null }
        {filename ? <div id="imagefileIcon" onClick={() => {update_image()}} ><Icon_Upload/></div> : null }
        {filename ? <div id="imageDeleteIcon" onClick={() => {setFilename(false)}} ><Icon_ben/></div> : null }
    {/* -- USER IMAGE ------------------------ */}
        <div id='Profil_info_content_perso'>
            {userClass.u_profil_image !== null ? <img id="profilImage" src={url}/> : 
            <div id='p_profilImage_Default'><p>{userClass.u_name[0].toUpperCase()}</p></div> }
            <button id="Profil_edit_btn" onClick={() => {props.functions.setEditUser(true)}} ><Icon_Edit/></button>
        </div>
    </div>
    <div id='info'>
    {/* -- USER INFORMATIONS ------------------------ */}
        <div id='info_text'>
        <p>{userClass.u_name.toUpperCase()+' '+userClass.u_last_name.toUpperCase()}</p>
        <p>candidate</p>
        <div id='contact'> <p>email:{' '+ userClass.u_email}</p> <p>phone: +33 {userClass.u_phone}</p> </div>
        <p>{userClass.u_address}<br/>{userClass.u_city+' '+userClass.u_postal_code}<br/>{userClass.u_department+' '+userClass.u_region}</p>
        </div>
        </div>
    </> : null}
</div>
);
};
    
 