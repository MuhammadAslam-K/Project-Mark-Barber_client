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
            <div className="flex flex-col justify-around sm:flex-row sm:space-x-4 mt-10">
                <div className="w-full max-w-md mx-auto sm:mx-0 mt-4 sm:mt-0 overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <div className="p-8 text-center">
                        <h1 className="text-3xl font-black text-blue">Total Staffs</h1>
                        <h1 className="text-3xl font-black text-blue">{dashboardData?.totalStaffs}</h1>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto sm:mx-0 mt-4 sm:mt-0 overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <div className="p-8 text-center">
                        <h1 className="text-3xl font-black text-blue">Total Shops</h1>
                        <h1 className="text-3xl font-black text-blue">{dashboardData?.totalShops}</h1>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminDashboard