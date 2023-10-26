import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLoggedOut from './AdminLoggedOut';
import AdminLoginPage from '../../pages/admin/auth/AdminLoginPage';


const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<AdminLoggedOut component={AdminLoginPage} />} />
        </Routes>
    )
}

export default AdminRoutes