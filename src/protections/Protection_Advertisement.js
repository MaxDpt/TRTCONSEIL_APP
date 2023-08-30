
import { Navigate } from "react-router-dom";

export default function Protected_Advertisement({children}) {

    if (sessionStorage.getItem('token') !== null) {
        return <Navigate to="/Advertisement" replace />
    }
    
    return (
    <div>
        {children}
    </div>
    );
};