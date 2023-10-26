import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLoggedOut from './AdminLoggedOut';
import AdminLoginPage from '../../pages/admin/auth/AdminLoginPage';
import AdminLoggedIn from './AdminLoggedIn';
import AdminDashboardPage from '../../pages/admin/dashboard/AdminDashboardPage';
import AdminStaffsManagementPage from '../../pages/admin/dashboard/staffs/AdminStaffsManagementPage';
import AdminNotApprovedStaffsPage from '../../pages/admin/dashboard/staffs/AdminNotApprovedStaffsPage';


const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<AdminLoggedOut component={AdminLoginPage} />} />

            <Route path='/dashboard' element={<AdminLoggedIn component={AdminDashboardPage} />} />
            <Route path='/staffs/approved' element={<AdminLoggedIn component={AdminStaffsManagementPage} />} />
            <Route path='/staffs/notApproved' element={<AdminLoggedIn component={AdminNotApprovedStaffsPage} />} />

        </Routes>
    )
}

export default AdminRoutes