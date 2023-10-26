import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../../pages/user/UserHomePage';


const UserRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<UserHomePage />} />

        </Routes>
    )
}

export default UserRoutes