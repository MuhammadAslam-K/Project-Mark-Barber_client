import React from 'react'
import { Routes, Route } from 'react-router-dom';
import StaffLoginPage from '../../pages/staff/auth/StaffLoginPage';
import StaffLoggedOut from './StaffLoggedOut';
import StaffSignupPage from '../../pages/staff/auth/StaffSignupPage';


const StaffRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<StaffLoggedOut component={StaffLoginPage} />} />
            <Route path='/signup' element={<StaffLoggedOut component={StaffSignupPage} />} />
        </Routes>
    )
}

export default StaffRoutes