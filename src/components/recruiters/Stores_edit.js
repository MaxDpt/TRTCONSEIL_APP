
import Icon_Upload from '../icons/Icon_Upload';

export default function Stores_edit(props) {
    const departments = props.constants.departments
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')

    const UpdateStore = async () => {
        let form = document.querySelector('form');
        let userRole = props.userClass.u_role 
        var storeid = props.store[0].s_id
        await props.requests.StoresRequests.updateStore(token, id, storeid, form, userRole);
        props.getStores_ByUser();
    }

return (
<div className='edit_stores_details'> 
    <div id='Profil_info_content_header'>
        <p>EDIT STORE</p>
    </div>
    <div id='edit_stores_details'>
        
    <div id='edit_text_stores_details'>
    <form id="Store_Edit_Form">
        <label>Name :</label>       
        <input type='text' id='name' defaultValue={props.store[0].s_name} />
        <label>Address :</label>                
        <input type='text' id='address' defaultValue={props.store[0].s_address}/>
        <label>City :</label>
        <input type='text' id='city' defaultValue={props.store[0].s_city}/>
        <label>Postal code :</label>
        <select type='text' id='postal_code' >
        <option key={'option'+props.store[0].s_postal_code} value={parseInt(props.store[0].s_postal_code)} >{props.store[0].s_postal_code+' '+props.store[0].s_department+' '+props.store[0].s_region}</option>
            {departments.map(result => 
                <option key={'option'+result.num_dep} value={result.num_dep} >{result.num_dep+' '+result.dep_name+' '+result.region_name}</option>)}
        </select>
        <label>Phone :</label>
        <input id='phone' defaultValue={props.store[0].s_phone}/>
        <label>Hourly :</label>
        <input type='text' id='hourly' defaultValue={props.store[0].s_hourly}/>               
        <label>N° Siren :</label>
        <input type='text' id='siren' defaultValue={props.store[0].s_siren}/>
        <div id='Info_edit_btn' onClick={()=> UpdateStore()}><Icon_Upload/></div>
    </form>
    </div>
    </div> 
</div>
);
    };
    
