import AdminNavbar from "../../../../components/admin/AdminNavbar"
import AdminStaffManagement from "../../../../components/admin/Staffs/AdminStaffManagement"

function AdminStaffsManagementPage() {
    return (
        <div className="bg-gray-100 h-screen">
            <AdminNavbar />
            <AdminStaffManagement />
        </div >
    )
}

export default AdminStaffsManagementPage