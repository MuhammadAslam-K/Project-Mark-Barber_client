import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLoggedOut from './AdminLoggedOut';
import AdminLoginPage from '../../pages/admin/auth/AdminLoginPage';
import AdminLoggedIn from './AdminLoggedIn';
import AdminDashboardPage from '../../pages/admin/dashboard/AdminDashboardPage';
import AdminStaffsManagementPage from '../../pages/admin/dashboard/staffs/AdminStaffsManagementPage';
import PersonalServicesDetailsPage from '../../pages/admin/PersonalServices/PersonalServicesDetailsPage';
import ShopeDetailsPage from '../../pages/admin/shopes/ShopeDetailsPage';


const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<AdminLoggedOut component={AdminLoginPage} />} />

            <Route path='/dashboard' element={<AdminLoggedIn component={AdminDashboardPage} />} />
            <Route path='/staffs' element={<AdminLoggedIn component={AdminStaffsManagementPage} />} />


            <Route path='/Personal-Services' element={<AdminLoggedIn component={PersonalServicesDetailsPage} />} />
            <Route path='/shopes' element={<AdminLoggedIn component={ShopeDetailsPage} />} />


        </Routes>
    )
}

export default AdminRoutes