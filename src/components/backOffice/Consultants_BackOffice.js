import React, {useState, useEffect} from 'react';
import Icon_ben from '../icons/Icon_Ben';

export default function Consultants_BackOffice(props) {

/* ----- DATA --------------------------------------- */
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    var [errorForm, setErrorForm] = useState(false);
    var [validation, setValidation] = useState(false);
    var [consulantNav, setConsulantNav] = useState('list')
    var userRole = props.user[0].u_role;
    const [user, setUser] = useState(false)

    useEffect(() => { getUser_ToRole() }, []);

    const getUser_ToRole = async () => {
        const role = 'consultant'
        const getUsersToRole_request = await props.requests.UsersRequests.getUsersToRole(token, id, role)
        if (getUsersToRole_request) {setUser(getUsersToRole_request)}
    }

    const delete_User = async (userid) => {
        await props.requests.UsersRequests.deleteUser(token, id , userid);
        getUser_ToRole();
    }

    const createUser = async () => {
        let form = document.querySelector('form');
        /* ----- REQUEST ------------ */
        var signInUser_request = await props.requests.signInUser(form, userRole, setErrorForm);
        if (signInUser_request && signInUser_request.error) {setErrorForm(signInUser_request.error)}
        else {setValidation('succes !'), setErrorForm(false), getUser_ToRole(), form.reset()}

    } 

    return (
    <div id='Consultants_content'>
        {props.params.screenSize === 'Mobile' ?
          <div id='consultant_nav'>
            <button className={`'Navbutton' ${consulantNav === 'list' ? 'Navbutton_select' : 'Navbutton'}`}
              onClick={() => {setConsulantNav('list')}}>list</button>
            <button className={`'Navbutton' ${consulantNav === 'create' ? 'Navbutton_select' : 'Navbutton'}`}
              onClick={() => {setConsulantNav('create')}}>create</button>
          </div> : null}

        {/* ----- TABLEAU CONSULTANTS -------------------------- */}
        {props.params.screenSize === 'PC' || props.params.screenSize === 'Mobile' && consulantNav === 'list' ? <>
        {user ? <div id='Result'> {user.map(result => 
            <div id='Result_row' key={'div'+result.u_id}> 
              <p key={'name'+result.u_id}>{result.u_name[0].toUpperCase() + result.u_name.slice(1)+ ' ' + 
              result.u_last_name[0].toUpperCase() + result.u_last_name.slice(1)}</p>
              <p id='email' key={'email'+result.u_id}>{result.u_email}</p>
              <p id='role' key={'role'+result.u_id}>{result.u_role}</p>
              <div onClick={() => { delete_User(result.u_id) }} id='delete'> <Icon_ben/> </div>
            </div>)}
        </div> : null} </> : null }

        {props.params.screenSize === 'PC' || props.params.screenSize === 'Mobile' && consulantNav === 'create' ? 
        <div id='Consultants_form_content'>
        {/* ----- FORMULAIRE CONSULTANTS -------------------------- */}
        <div id='form_header'><p>CREATE NEW CONSULTANT</p></div>
        <form id='formulary'>
            <label>Name :</label> 
            <input id='name' type='text' /> 
            <label>Last name :</label> 
            <input id='last_name' type='text' /> 
            <label>Email :</label> 
            <input id='email' type='text' />
            <label>Password :</label> 
            <input id='pass' type='text' /> 
        {/* ----- REGISTRATION BUTTON ------------------------- */}
            <div id='form-btn' onClick={() => {createUser()}}>registrer</div>
        </form>
        {/* ----- ERROR MESSAGES ------------------------------ */}
        {errorForm ? <p id='messageError'>{errorForm}</p> : null}
        {validation ? <p id='messageValid'>{validation}</p> : null}
        </div> : null }
    </div>
    );
};