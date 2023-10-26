import AdminStaffManagement from "../../../../components/admin/Staffs/AdminStaffManagement"
import AdminNavbar from "../../../../components/admin/AdminNavbar"

function AdminStaffsManagementPage() {
    return (
        <div className="bg-gray-100">
            <AdminNavbar />
            <AdminStaffManagement />
        </div>
    )
}

export default AdminStaffsManagementPage