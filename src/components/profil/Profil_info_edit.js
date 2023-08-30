import Icon_Back from "../icons/Icon_Back";
import Icon_Upload from "../icons/Icon_Upload";

    export default function Profil_info_edit(props) {
        const departments = props.constants.departments
        var token = sessionStorage.getItem('token')
        var id = sessionStorage.getItem('id')
        const userRole = props.userClass.u_role; 

        const update_user = async () => {
            let form = document.querySelector('form');
            await props.requests.UsersRequests.updateUser(token, id , form, userRole)
            props.functions.getUserId();

        }

        return (
        <div id="Profil_info_edit_content">
        <>
        <div id='Profil_info_content_header'>
         <button id="Profil_edit_btn_back" onClick={() => {props.functions.setEditUser(false)}} ><Icon_Back/></button>
         <p>EDIT PROFIL</p>
         <button id="Upload_edit_btn" onClick={() => {update_user()}} ><Icon_Upload/></button>
        </div>
        <div id='info'>
            <form id="profilEdit_form">
            <label>First name :</label>
            <input type='text' id="name" defaultValue={props.userClass.u_name} />

            { props.userClass && props.userClass.u_role === 'candidate' ? <>
            <label>Last name :</label>
            <input type='text' id="last_name" defaultValue={props.userClass.u_last_name} />
            </> : null }

            <label>Address :</label>
            <input type='text' id="address" defaultValue={props.userClass.u_address} />
            <label>City :</label>
            <input type='text' id="city" defaultValue={props.userClass.u_city} />
            <label>Postal code :</label>
            <select type='text' id='postal_code' >
            <option key={'option'+props.userClass.u_postal_code} value={parseInt(props.userClass.u_postal_code)} >{props.userClass.u_postal_code+' '+props.userClass.u_department+' '+props.userClass.u_region}</option>
            {departments.map(result => 
            <option key={'option'+result.num_dep} value={result.num_dep} >{result.num_dep+' '+result.dep_name+' '+result.region_name}</option>)}
            </select>

            { props.userClass && props.userClass.u_role === 'candidate' ? <>
            <label>Vehicle :</label>
            <select id="vehicle">
            <option value={props.userClass.u_vehicle} > {props.userClass.u_vehicle} </option>
            <option value='aucun' > --- Aucun --- </option>
            </select>
            </> : null }

            <label>Phone :</label>
            <input id="phone" defaultValue={`0${props.userClass.u_phone}`}/>

        { props.userClass && props.userClass.u_role === 'recruiter' ? <>
            <label>Activity :</label>
            <input id="Activity" defaultValue={`${props.userClass.u_activity}`}/>
            <label>Siret :</label>
            <input id="Siret" defaultValue={`${props.userClass.u_siret}`}/>
        </> : null }

            </form>
        </div>
        </> 

        </div>
        );
    };
    

