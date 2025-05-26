import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { getCookie } from "../utils/cookies.jsx";

const PrivateRoutes = () => {
    const location = useLocation();

    const token = getCookie("accessToken");

    if (token === null) {
        return <Navigate to="/sign_in" state={{ from: location }}/>;
    }

    return <Outlet />;
}

export default PrivateRoutes;