
    import React, {useState, useEffect} from 'react';
    import Icon_Add from '../icons/Icon_Add';
    import Icon_Back from '../icons/Icon_Back';
    import Icon_Upload from '../icons/Icon_Upload';
    export default function Advertisements_form(props) {
/* ----------- DATA ---------------------------------------- */
        const jobs = props.constants.jobs
        var token = sessionStorage.getItem('token')
        var id = sessionStorage.getItem('id')
        const [stores, setStores] = useState(false);
        const [storesID, setStoresID] = useState(false); 
        var [errorForm, setErrorForm] = useState(false);
        const text = props.text
        const page = 'stores_form'

/* ------- GET STORE WITH ID -------------------------------- */
    useEffect(() => {
        getStores_ByUser()
    }, []);

    const getStores_ByUser = async () => {
        if (id && token) {
            const getStoresByUser_request = await props.requests.StoresRequests.getStoresByUser(token, id);
            if (getStoresByUser_request) {setStores(getStoresByUser_request)}
        }
    }
    
 /* ------- CREER UN ADVERTISEMENT -------------------------  */
    const createAdvertisement = async () => {
        let form = document.querySelector('form');
        let userRole = props.userClass[0].u_role;
        let storeid =  storesID;

        /* ---- VERIFICATIONS -----------  */
        if (form.elements[0].value && form.elements[1].value && form.elements[2].value 
        && form.elements[3].value && form.elements[4].value) {
        if (form.elements[0].value.length <= 60 ) { if (form.elements[4].value.length <= 4000) { 
        if (isNaN(form.elements[2].value) == false) { if (isNaN(form.elements[3].value) == false) {

        // ---> Envoie du formulaire :
        await props.requests.PublicationsRequests.setPublication(token, id, form, storeid, userRole);
        form.reset();
        props.functions.getAllPublications();

        /* ---- ERROR MESSAGES -----------  */
        } else {setErrorForm(text.Error_Hourly_Invalid)}
        } else {setErrorForm(text.Error_Salary_Invalid)}
        } else {setErrorForm('The details field'+text.Error_Text_Length_4000)}
        } else {setErrorForm('The salary field'+text.Error_Text_Length_60)}
        } else {setErrorForm(text.Error_Formulary_Empty)}
    }

return (
    <div id='Advertisement_form_page'>
{/* ----- PC VERSION --------------------------------- */}
{props.screenSize == 'PC' ? <>
    {/* ----- STORES LIST --------------------------------- */}
        <div id='stores_list_form'>
        <h2>Choose the relevant store :</h2>
            {stores ? <div id='stores_list_map'> {stores.map(result => 
                <div key={'div'+result.s_id} id='stores_list_row'>
                    <p key={result.s_id+'name'+result.s_name}>{result.s_name.toUpperCase()}</p>
                    <p key={result.s_id+'siren'+result.s_siren}> N° Siren: {result.s_siren} </p>
                    {storesID === false ? <button onClick={() => setStoresID(result = result.s_id)}><Icon_Add/></button> : null}
                </div>)} 
            </div> : null}
        </div>

        <div className={`Advertisement_form_header ${ !storesID ? 'Advertisement_form_header_Empty' : 'Advertisement_form_header'}`}>
            { storesID ? <p>NEW ADVERTISEMENT</p> : null }
            {/* ----- CHANGE STORE BUTTON ------------------------- */}
            { storesID ? <button id ='Advertisement_form_changeStore'onClick={() => setStoresID(false)}><Icon_Back/></button> : null }
            {/* ----- REGISTER STORE BUTTON ------------------------- */}
            { storesID ? <div id='registrer_btn'><button onClick={createAdvertisement}><Icon_Upload/></button></div> : null }
        </div>

        {storesID ? 
            <div id='Advertisement_form_content'>

        {/* ----- STORE SELECTED------- --------------------- */}
            {stores ? <div id='Advertisement_form_store'> {stores.map(result => <>
            { result.s_id === storesID ? <div key={'div'+result.s_id}>
                <p id='store_name' key={result.s_id+'name'+result.s_name}>{result.s_name.toUpperCase()}</p>
                <p id='store_info' key={result.s_id+'address'+result.s_address}>{result.s_address}</p>
                <p id='store_info' key={result.s_id+'city'+result.s_city}>{result.s_city+ ' ' + result.s_postal_code + ' ' + result.s_department }</p>
            <p id='store_info' key={result.s_id+'postal_code'+result.s_postal_code}>{result.s_region}</p>
            </div> : null } </>)} 
            </div> : null} 

        {/* ----- ADVERTISEMENT FORMULARY --------------------- */}
            <form id='Advertisement_form'>
                <label>Activity :</label>
                <select>
                <option key={'option'+'null'} value={false} >--- Activity ---</option>
                {jobs.map(result =>  
                <option key={'option'+result.job} value={result.job} >{result.job}</option>
                )}
                </select>
                <label>Contract :</label> 
                <select id='contract' type='text'> 
                    <option value={'CDD'}>CDD</option>
                    <option value={'CDI'}>CDI</option>
                    <option value={'Interim'}>Interim</option>
                    <option value={'Training'}>Training</option>
                    <option value={'Internship'}>Internship</option>
                </select> 
                <label>Hourly :</label> 
                <input id='hourly' type='number' /> 
                <label>Salary :</label> 
                <input id='salary' type='number' /> 
                <label>details :</label> 
                <textarea id='details' type='text' /> 
            </form>

        {/* ----- ERROR MESSAGE --------------------------------- */}
                {errorForm ? <p>Error : {errorForm}</p> : null}
            </div> : null} 
            <div className={`Advertisements_details_Empty ${props.profilPage === true ? 'Advertisements_details_Empty_small' : 'Advertisements_details_Empty'}`}></div>
            </> : null}

{/* ----- MOBILE VERSION --------------------------------- */}
{props.screenSize == 'Mobile' ? <> 
    {/* ----- STORES LIST --------------------------------- */}
    {storesID == false ? 
    <div id='stores_list_form'>
        <p>Choose the relevant store :</p>
        {stores ? <div id='stores_list_map'> {stores.map(result => 
            <div key={'div'+result.s_id} id='stores_list_row'>
                <p key={result.s_id+'name'+result.s_name}>{result.s_name.toUpperCase()}</p>
                <p key={result.s_id+'siren'+result.s_siren}> N° Siren: {result.s_siren} </p>
                {storesID === false ? <button onClick={() => setStoresID(result = result.s_id)}><Icon_Add/></button> : null}
            </div>)} </div> : null}
        {!stores[0] ? <p>No store available</p> : null }
    </div> : null }
    {storesID ? 
    <div className={`Advertisement_form_header`}>
            { storesID ? <p>NEW ADVERTISEMENT</p> : null }
            {/* ----- CHANGE STORE BUTTON ------------------------- */}
            { storesID ? <button id ='Advertisement_form_changeStore'onClick={() => setStoresID(false)}><Icon_Back/></button> : null }
            {/* ----- REGISTER STORE BUTTON ------------------------- */}
            { storesID ? <div id='registrer_btn'><button onClick={createAdvertisement}><Icon_Upload/></button></div> : null }
    </div> : null }

    {storesID ? 
        <div id='Advertisement_form_content'>

    {/* ----- STORE SELECTED------- --------------------- */}
        {stores ? <div id='Advertisement_form_store'> {stores.map(result => <>
        { result.s_id === storesID ? <div key={'div'+result.s_id}>
            <p key={result.s_id+'name'+result.s_name}>{result.s_name.toUpperCase()}</p>
            <p key={result.s_id+'address'+result.s_address}>{result.s_address}</p>
            <p key={result.s_id+'city'+result.s_city}>{result.s_city+ ' ' + result.s_postal_code + ' ' + result.s_department }</p>
            <p key={result.s_id+'postal_code'+result.s_postal_code}>{result.s_region}</p>
        </div> : null } </>)} 
        </div> : null} 

    {/* ----- ADVERTISEMENT FORMULARY --------------------- */}
    <form id='Advertisement_form'>
                <label>Activity :</label>
                <select>
                <option key={'option'+'null'} value={false} >--- Activity ---</option>
                {jobs.map(result =>  
                <option key={'option'+result.job} value={result.job} >{result.job}</option>
                )}
                </select>
                <label>Contract :</label> 
                <select id='contract' type='text'> 
                    <option value={'CDD'}>CDD</option>
                    <option value={'CDI'}>CDI</option>
                    <option value={'Interim'}>Interim</option>
                    <option value={'Training'}>Training</option>
                    <option value={'Internship'}>Internship</option>
                </select> 
                <label>Hourly :</label> 
                <input id='hourly' type='number' /> 
                <label>Salary :</label> 
                <input id='salary' type='number' /> 
                <label>details :</label> 
                <textarea id='details' type='text' /> 
    </form>

    {/* ----- ERROR MESSAGE --------------------------------- */}
            {errorForm ? <p id='errorMessage'>Error : {errorForm}</p> : null}
            <div className={`Advertisements_details_Empty ${props.profilPage === true ? 'Advertisements_details_Empty_small' : 'Advertisements_details_Empty'}`}></div>
        </div> : null} 
       


</> : null}
    </div>
);
};
 