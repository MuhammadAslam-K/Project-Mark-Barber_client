import { Link } from "react-router-dom"
import staffEndPoints from "../../../constraints/endPoints/staffEndPoints"
import { useEffect, useState } from "react"
import { staffAxios } from "../../../constraints/axiosIntersepter/staffIntersepter"
import staffApis from "../../../constraints/apis/staffApis"
import { handleErrors } from "../../../constraints/errorHandler"

function StaffDashboard() {

    const [dashboard, setDashboard] = useState<string | null>(null)

    useEffect(() => {
        const fetchStaffDashboardData = async () => {
            try {
                const response = await staffAxios.get(staffApis.dashboard)
                console.log(response)
                setDashboard(response.data)
            } catch (error) {
                console.log(error);
                handleErrors(error)
            }
        }
        fetchStaffDashboardData()
    })

    return (
        <>
            <div className="flex flex-wrap justify-around m-10 cursor-pointer">
                <div className="w-2/3 overflow-hidden rounded-3xl bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out hover:bg-blue-200 mb-4 sm:w-auto sm:mb-0 sm:mr-4">
                    <div className="p-6">
                        <h3 className="text-3xl font-bold text-gray-800 text-center">Total Shop</h3>
                        <h3 className="text-4xl font-bold text-blue-500 text-center">
                            {dashboard}
                        </h3>
                    </div>
                </div>

                <div className="w-2/3 overflow-hidden rounded-3xl bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out hover:bg-green-200 mb-4 sm:w-auto sm:mb-0 sm:mx-4">
                    <Link to={staffEndPoints.addPersonalServices} >
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-gray-800 text-center">Add New Barber</h1>
                        </div>
                    </Link>
                </div>
                <div className="w-2/3 overflow-hidden rounded-3xl bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out hover:bg-green-200 mb-4 sm:w-auto sm:mb-0 sm:mx-4">
                    <Link to={staffEndPoints.addNewShop} >
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-gray-800 text-center">Add New Shope</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default StaffDashboard