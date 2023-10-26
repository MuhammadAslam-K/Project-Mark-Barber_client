import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rootState } from '../../types/reduxInterfaces';

interface ProtectedRouteProps {
    component: React.FC;
}

const StaffLoggedOut: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const staff = useSelector((state: rootState) => state.staff.loggedIn);

    console.log("staff", staff)
    if (staff) {

        return <Navigate to="/staff/dashboard" />;
    }
    return <Component />;
};

export default StaffLoggedOut;
