import React from 'react'
import { Routes, Route } from 'react-router-dom';
import StaffLoginPage from '../../pages/staff/auth/StaffLoginPage';
import StaffLoggedOut from './StaffLoggedOut';
import StaffSignupPage from '../../pages/staff/auth/StaffSignupPage';
import StaffLoggedIn from './StaffLoggedIn';
import StaffDashboardPage from '../../pages/staff/dashboard/StaffDashboardPage';
import StaffAddNewShopePage from '../../pages/staff/shope/StaffAddNewShopePage';
import ShopesStaffSidePage from '../../pages/staff/shope/ShopesStaffSidePage';


const StaffRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<StaffLoggedOut component={StaffLoginPage} />} />
            <Route path='/signup' element={<StaffLoggedOut component={StaffSignupPage} />} />


            <Route path='/dashboard' element={<StaffLoggedIn component={StaffDashboardPage} />} />
            <Route path='/shope/add' element={<StaffLoggedIn component={StaffAddNewShopePage} />} />
            <Route path='/shopes' element={<StaffLoggedIn component={ShopesStaffSidePage} />} />

        </Routes>
    )
}

export default StaffRoutes