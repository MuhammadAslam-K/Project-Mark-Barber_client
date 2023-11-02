
import AdminNavbar from "../../../components/admin/AdminNavbar"
import AdminDashboard from "../../../components/admin/dashboard/AdminDashboard"

function AdminDashboardPage() {
    return (
        <div className="bg-gray-100 h-screen">
            <AdminNavbar />
            <AdminDashboard />
        </div>
    )
}

export default AdminDashboardPage