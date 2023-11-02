import StaffNavbar from "../../../components/staff/StaffNavbar"
import StaffDashboard from "../../../components/staff/dashboard/StaffDashboard"

function StaffDashboardPage() {
    return (
        <div className="bg-gray-100 h-screen">
            <StaffNavbar />
            <StaffDashboard />
        </div>
    )
}

export default StaffDashboardPage