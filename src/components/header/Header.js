
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Header_nav from './Header_Nav';


export default function Header(props) {
/* ----- DATA -------------------------------------*/
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    const [userRole, setUserRole] = useState(false);

    useEffect( () => {
        getUserID();
        }, []);

     const getUserID = async () => {
         if (token) {
             const userid = id;
             const user_request = await props.getUser(token, id, userid);
             if (user_request && !user_request.message ) { setUserRole(user_request[0].u_role) }
             else { sessionStorage.removeItem('token'), window.location.replace('/') }
         }
     }

    return (
    <header id="header">
    {/* ----- TRT CONSEIL LINK ------------------ */}
        {token !== null ? <Link id="header_Link_Title" to="/Advertisement">TRT Conseil </Link> :
        <Link id="header_Link_Title" to="/">TRT Conseil </Link>}

    {/* ----- HEADER NAVIGATION ------------------ */}
        <Header_nav  userRole={userRole} token={token} />

    </header>
    );
};