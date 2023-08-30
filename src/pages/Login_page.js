
import React, {useState} from 'react';
import text from "../constants/text.json"
import userFunctions from "../requetes/user_request";

export default function Login() {
// -- DATA -----------------------------
 var [errorLogin, setErrorLogin] = useState(false)
 
// -- LOGIN FUNCTION --------------------
const loginForm = async () => {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    if (email && pass) {
        
    // ---> requête de connexion :
    const userLogIn = await userFunctions.userLogIn(email, pass); 

    // ---> connexion :
    if (userLogIn && userLogIn[0].u_token) {
    if (userLogIn[0].u_status === 'approve') {

        sessionStorage.setItem('token', userLogIn[0].u_token)
        sessionStorage.setItem('id', userLogIn[0].u_id)
        window.location.replace('/Advertisement') 

    // ---> erreur d'identification :
    } else { setErrorLogin(text.Error_Account_NotActivated) }
    } else { setErrorLogin(text.Error_Login_Invalid) }
    } else { setErrorLogin(text.Error_Login_Invalid) }
} 
      
return (
<div id="Login_page">
    <div id="Login_content">
    <div id="Login_header"><p>CONNEXION</p></div>
    {/* -- LOGIN FORMULARY ----------------- */}
    <form id="Login_form">
        <label>Email :</label>
        <input id='email' type='text' />
  
        <label>Password :</label> 
        <input id='pass' type='text' /> 
    {/* -- LOGIN BUTTON -------------------- */}
        <div id='button' onClick={loginForm}><p>login</p></div>
    </form>
    {/* -- ERROR MESSAGE ------------------- */}
        <p>{errorLogin ? errorLogin : null}</p>
    </div>
</div>
);
};
    

