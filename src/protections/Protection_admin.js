import { Navigate } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { getUserRole } from "../requetes/user_request";

export default function Protected_Admin({children}) {
    const token = sessionStorage.getItem('token')
    const id = sessionStorage.getItem('id')
    const [userRole, setUserRole] = useState(false);

// ---> GET USER ROLE ---------------------- 
    useEffect(() => {getUser_Role() }, []);

const getUser_Role = async () => {
    if (token && id) {
        const getUserRole_request =  await getUserRole(token, id);
        if (getUserRole_request) {setUserRole(getUserRole_request) }
    }
}
// ---> VERIFICATION ------------------------
    if (userRole) {
        if (token && id) {
            if ( userRole[0].u_role !== 'consultant' && userRole[0].u_role !== 'administrator') {
                return <Navigate to="/Advertisement" replace /> } }
    }
    if (sessionStorage.getItem('token') === null) {
        return <Navigate to="/" replace />
    }
    return (
    <div>
        {children}
    </div>
    );
};