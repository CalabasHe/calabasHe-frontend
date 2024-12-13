import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const PrivateRoutes = () => {
    const { userType } = useAuth();

    if (userType !== "doctor") {
        return <Navigate to="/" replace/>;
    }

    return <Outlet />;
}

export default PrivateRoutes;