
import {Link} from "react-router-dom";

export default function Header_nav(props) {

/* ----- LOGOUT ---------------------------------- */ 
    const LogOut = () => {
        sessionStorage.removeItem('token');
        window.location.replace('/')}

    return (
    <div id="header_nav">
    {/* ----- HEADER BUTTON --------------------- */}
        <div id='header_btns'>
            {/* -- REGISTRATION BUTTON -- */}
            {props.token === null ? <Link id="header_Link" to="/Registration">Registration </Link> :null }
            
            {/* -- PROFIL BUTTON -- */}
            {props.token !== null && props.userRole === 'candidate' || props.userRole === 'recruiter' ? 
            <Link id="header_Link" to="/Profil">Profil </Link> : null }
            
            {/* -- BACK-OFFICE BUTTON -- */}
            {props.token !== null && props.userRole === 'administrator' || props.userRole === 'consultant' ? 
            <Link id="header_Link" to="/BackOffice">BackOffice </Link> : null }
            
            {/* -- LOGIN / LOGOUT BUTTON -- */}
            {props.token === null ? <Link id="header_Link" to="/Login">Login </Link> : null }

            {props.token !== null ?<button id="header_Link_logout" onClick={LogOut}>Logout</button> : null}
        </div>
    </div>
    );
};
    
