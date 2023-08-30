
import { Navigate } from "react-router-dom";

export default function Protected_Login({children}) {

    if (sessionStorage.getItem('token') === null) {
        return <Navigate to="/Login" replace />
    }


    return (
    <div>
        {children}
    </div>
    );
};
    
