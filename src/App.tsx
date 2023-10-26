
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import StaffRoutes from "./routes/staffs/StaffRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";
import { Toaster } from "react-hot-toast";
import UserRoutes from "./routes/user/userRoutes";



function App() {

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/staff/*" element={<StaffRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
