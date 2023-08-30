
import React, {useState, useEffect} from 'react';
import Profil_info_details from '../profil/Profil_info_details';
import Stores_details from './Stores_details';
import Stores_edit from './Stores_edit';
import Stores_form from './Stores_form';
import Icon_close from '../icons/Icone_close';
import Icon_Edit from '../icons/Icon_Edit';
import Profil_info_edit from '../profil/Profil_info_edit';

export default function Stores_list(props) {
    const [stores, setStores] = useState(false);
    const [store, setStore] = useState(false);
    const [editStore, setEditStore] = useState(false)
    const [storesForm, setStoresForm] = useState('list')

    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    
    /* GET STORE WITH ID */
    useEffect(() => { getStores_ByUser()}, []);

    const getStores_ByUser = async ()  => {
        if (id && token) {
        const getStores_ByUser_request = await props.requests.StoresRequests.getStoresByUser(token, id);
        if (getStores_ByUser_request) {setStores(getStores_ByUser_request)}
    }
    }
    const getStore_ById = async (storeid)  => { 
        if (storeid) {
            const getStore_ById_request = await props.requests.StoresRequests.getStoreById(token, id, storeid);
            if (getStore_ById_request) {setStore(getStore_ById_request)};
        }
    }    
    
return (
<div id='stores_content'>
{/* -- BUTTON STORE LIST / STORE FORM ------------------------ */}
{props.params.screenSize === 'PC' || props.params.screenSize === 'Mobile' && !editStore && !props.data.editUser ?
            <div className={`'info_list_btns' ${ storesForm === 'create' && props.params.screenSize == 'Mobile' ? 'edit_list_btns' : 'info_list_btns'}`}>
                <button className={`Navbutton ${storesForm === 'list' ? 'Navbutton_select' : 'Navbutton'}`}
                    onClick={() => {setStoresForm('list')}} >store list</button>
                <button className={`Navbutton ${storesForm === 'create' ? 'Navbutton_select' : 'Navbutton'}`} 
                    onClick={() => {setStoresForm('create')}} >create</button>
            </div> : null }
{/* --------- PC VERSION -------------------------------------------------------------- */}
        {props.params.screenSize == 'PC' ? <>

        { storesForm == 'create' ? <div id='stores_form'>
        <div id='stores_background'></div>
        <div id='stores_form_content'>
        {/* ----- STORE FORM ----- */}
            <Stores_form screenSize={props.params.screenSize} userClass={props.userClass} getStores_ByUser={getStores_ByUser} requests={props.requests} constants={props.constants} /></div>

        {/* ----- PROFIL INFO ----- */}
            <Profil_info_details userClass={props.userClass}  functions={props.functions} data={props.data} requests={props.requests} constants={props.constants}/>
        </div> : null}

         { storesForm == 'list' ?    
        <div id='stores_list'>
        {/* ----- STORE LIST ----- */}
            {stores ? <div id='stores_list_map'> {stores.map(result => 
                <div id='stores_list_row' onClick={() => {getStore_ById(result.s_id), setEditStore(false)}} key={'div'+result.s_id}>
                  
                    <p key={result.s_id+'name'+result.s_name}>{result.s_name.toUpperCase()}</p>
                    <p key={result.s_id+'siren'+result.s_address}> N° Siren: {result.s_siren} </p>
                  
                </div>)} 
                
            </div> : null}

        {/* ----- PROFIL INFO ----- */}
            {!store  && props.params.page !== 'stores_form' && editStore == false && !props.data.editUser ? 
                <Profil_info_details userClass={props.userClass}  functions={props.functions} data={props.data} requests={props.requests} constants={props.constants}/> : null}
            {!store  && props.params.page !== 'stores_form' && editStore == false && props.data.editUser ? 
                <Profil_info_edit userClass={props.userClass}  functions={props.functions} data={props.data} requests={props.requests} constants={props.constants}/> : null}
        
        {/* ----- STORE INFO ----- */}
            {store !== false && props.params.page !== 'stores_form' && editStore == false ?  <>    
                <Stores_details editStore={editStore} screenSize={props.params.screenSize} store={store} userClass={props.userClass}/>
                <button id='Info_close_btn' onClick={() => setStore(false)}><Icon_close/></button>
                <button id='Info_edit_btn' onClick={() => setEditStore(true)}><Icon_Edit/></button> </> : null }
        
        {/* ----- STORE EDIT ----- */}
            {store !== false && props.params.page !== 'stores_form' && editStore == true ?
            <> <Stores_edit editStore={editStore} store={store} userClass={props.userClass} getStores_ByUser={getStores_ByUser} requests={props.requests} constants={props.constants} />
                <button id='Info_close_btn' onClick={() => setEditStore(false)}><Icon_close/></button> </> : null}
        </div> : null }
        </> : null }

{/* --------- MOBILE VERSION -------------------------------------------------------------- */}
        {props.params.screenSize == 'Mobile' ? <>
        {/* ----- PROFIL INFO ----- */}
        {store === false && editStore == false && storesForm === 'list' && !props.data.editUser ?
            <Profil_info_details userClass={props.userClass} functions={props.functions} data={props.data} requests={props.requests} constants={props.constants}/> : null }
        {!store  && props.params.page !== 'stores_form' && editStore == false && props.data.editUser ? 
            <Profil_info_edit userClass={props.userClass}  functions={props.functions} data={props.data} requests={props.requests} constants={props.constants}/> : null}
        
        {/* ----- STORE FORM ----- */}
        {storesForm === 'create' ?
            <div id='stores_form_content'><Stores_form screenSize={props.screenSize} userClass={props.userClass} getStores_ByUser={getStores_ByUser} requests={props.requests} constants={props.constants} /></div> : null }
        
        {/* ----- STORE INFO ----- */}
        {store !== false && props.params.page !== 'stores_form' && editStore == false && storesForm === 'list'?  <>    
                <Stores_details editStore={editStore} screenSize={props.screenSize} store={store} userClass={props.userClass}/>
                <button id='Info_close_btn' onClick={() => setStore(false)}><Icon_close/></button>
                <button id='Info_edit_btn' onClick={() => setEditStore(true)}><Icon_Edit/></button> </> : null }
        
        {/* ----- STORE EDIT ----- */}
        {store !== false && props.params.page !== 'stores_form' && editStore == true ?
        <> <Stores_edit editStore={editStore} store={store} userClass={props.userClass} getStores_ByUser={getStores_ByUser} requests={props.requests} constants={props.constants} />
             <button id='Info_close_btn' onClick={() => setEditStore(false)}><Icon_close/></button> </> : null}
            
        {/* ----- STORE LIST ----- */}
        { storesForm == 'list' && !editStore && !props.data.editUser?    
        <div  className={`'stores_list' ${ editStore == true ? 'edit_stores_list' : 'stores_list'}`}>
            {stores ? <div id='stores_list_map'> {stores.map(result => 
                <div id='stores_list_row' onClick={() => {getStore_ById(result.s_id), setEditStore(false)}} key={'div'+result.s_id}>
                    <p key={result.s_id+'name'+result.s_name}>{result.s_name.toUpperCase()}</p>
                    <p key={result.s_id+'siren'+result.s_address}> N° Siren: {result.s_siren} </p>
                </div>)} 
            </div> : null}
        </div> : null}
        
        </> : null }


        </div>

        );
    };
    

