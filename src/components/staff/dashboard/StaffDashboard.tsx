import { Link } from "react-router-dom"
import staffEndPoints from "../../../constraints/endPoints/staffEndPoints"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { ErrorResponse } from "../../../types/errorInterfaces"
import toast from "react-hot-toast"
import { staffAxios } from "../../../constraints/axiosIntersepter/staffIntersepter"
import staffApis from "../../../constraints/apis/staffApis"

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
        fetchStaffDashboardData()
    })

    return (
        <>
            <div className="flex flex-col justify-around sm:flex-row sm:space-x-4 mt-10">
                <div className="w-full max-w-md mx-auto sm:mx-0 mt-4 sm:mt-0 overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <div className="p-8">
                        {dashboard &&
                            <>
                                <h1 className="text-3xl font-black text-blue text-center">Total Shop</h1>
                                <h2 className="text-3xl font-black text-blue text-center">{dashboard}</h2>
                            </>
                        }
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto sm:mx-0 mt-4 sm:mt-0 overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <div className="p-8">
                        <Link to={staffEndPoints.addNewShop} >
                            <h1 className="text-3xl font-black text-blue text-center">Add New Shope</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffDashboard