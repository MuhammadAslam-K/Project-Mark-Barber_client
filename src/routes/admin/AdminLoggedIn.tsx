import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rootState } from '../../types/reduxInterfaces';


interface ProtectedRouteProps {
    component: React.FC;
}

const AdminLoggedIn: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const admin = useSelector((state: rootState) => state.admin.loggedIn);

    console.log(admin)
    if (!admin) {

        return <Navigate to="/admin/login" />;
    }
    return <Component />;
};

export default AdminLoggedIn;
