import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { ErrorResponse } from "../../../types/errorInterfaces";
import { adminAxios } from "../../../constraints/axiosIntersepter/adminIntersepter";
import adminApis from "../../../constraints/apis/adminApis";
import { adminDashboard } from "../../../types/adminSideInterface";

function AdminDashboard() {

    const [dashboardData, SetDashboardData] = useState<adminDashboard>()

    useEffect(() => {
        const fetchAdminDashboardData = async () => {
            try {
                const response = await adminAxios.get(adminApis.dashboard)
                console.log("response", response)
                SetDashboardData(response.data)
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    const axiosError: AxiosError<ErrorResponse> = error;
                    if (axiosError.response) {
                        toast.error(axiosError.response.data.error);
                    } else {
                        toast.error('Network Error occurred.');
                    }
                }
            }
        }
        fetchAdminDashboardData()
    }, [])
    return (
        <>
            <div className="flex flex-wrap justify-around m-10 cursor-pointer">
                <div className="w-2/3 overflow-hidden rounded-3xl bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out hover:bg-blue-200 mb-4 sm:w-auto sm:mb-0 sm:mr-4">
                    <div className="p-6">
                        <h3 className="text-3xl font-bold text-gray-800 text-center">Total Shop</h3>
                        <h3 className="text-4xl font-bold text-blue-500 text-center">
                            {dashboardData?.totalShops}
                        </h3>
                    </div>
                </div>

                <div className="w-2/3 overflow-hidden rounded-3xl bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out hover:bg-green-200 mb-4 sm:w-auto sm:mb-0 sm:mx-4">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 text-center">Total Staffs</h1>
                        <h3 className="text-4xl font-bold text-blue-500 text-center">
                            {dashboardData?.totalStaffs}
                        </h3>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminDashboard