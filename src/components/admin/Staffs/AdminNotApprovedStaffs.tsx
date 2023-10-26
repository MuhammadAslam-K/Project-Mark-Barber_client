import { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import adminEndPoint from "../../../constraints/endPoints/adminEndPoint";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorInterfaces";
import toast from "react-hot-toast";
import { adminAxios } from "../../../constraints/axiosIntersepter/adminIntersepter";
import adminApis from "../../../constraints/apis/adminApis";
import { staffs } from "../../../types/adminSideInterface";

function AdminNotApprovedStaffs() {

    const [staffs, SetStaffs] = useState<staffs[]>([])
    const [refresh, SetRefresh] = useState(false)

    useEffect(() => {
        const fetchApproveStaffs = async () => {
            try {
                const response = await adminAxios.get(adminApis.notApproved)
                console.log("response", response)
                SetStaffs(response.data)
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
        fetchApproveStaffs()
    }, [refresh])

    const handleApproveStaff = async (staffId: string) => {
        try {
            await adminAxios.patch(adminApis.approveStaff, { staffId })
            SetRefresh(!refresh)
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


    return (
        <>
            <div className="flex h-screen justify-center mt-9" >

                <div className="w-10/12 overflow-hidden rounded-3xl bg-white shadow-2xl sm:flex justify-center">
                    <div className="w-full ">
                        <div className="p-8">
                            <div className="p-8">
                            </div>

                            <div className="border-b border-gray-200">
                                <ul className="flex" role="tablist">
                                    <li className="mr-1">
                                        <Link
                                            to={adminEndPoint.approvedStaffs}
                                            className="bg-gray-300  text-gray-700  py-2 px-4 rounded-t-lg active:bg-white focus:outline-none focus:ring focus:ring-indigo-300"
                                            role="tab"
                                            aria-selected="true"
                                        >
                                            Approved
                                        </Link>
                                    </li>

                                    <li className="mr-1">
                                        <Link
                                            to={adminEndPoint.notApproved}
                                            className=" border-gray-400 border-2  text-gray-700 hover:bg-white py-2 px-4 rounded-t-lg active:bg-white focus:outline-none focus:ring focus:ring-indigo-300"
                                            role="tab"
                                            aria-selected="true"
                                        >
                                            Not Approved
                                        </Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                                <table className="w-full text-sm text-left text-white  dark:text-white">
                                    <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-slate-500 dark:text-white border-b-white border-4 font-bold">

                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Mobile
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs && staffs.map((items) => (

                                            <tr key={items._id} className=" bg-gray-700 dark:bg-slate-400 border-b  dark:border-gray-900  dark:hover:bg-gray-500">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {items.name}
                                                </th>
                                                <td className="px-6 py-4 dark:text-white">
                                                    {items.mobile}
                                                </td>
                                                <td className="px-6 py-4 dark:text-white">
                                                    ₹ {items.email}
                                                </td>
                                                <td className="px-6 py-4 dark:text-white">
                                                    <p className="cursor-pointer" onClick={() => handleApproveStaff(items._id)}>Approve</p>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}


export default AdminNotApprovedStaffs