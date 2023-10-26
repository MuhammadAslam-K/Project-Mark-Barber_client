import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { ErrorResponse } from "../../../types/errorInterfaces";
import { staffAxios } from "../../../constraints/axiosIntersepter/staffIntersepter";
import staffApis from "../../../constraints/apis/staffApis";
import { ShopData } from "../../../types/staffSideInterface";


function ShopesDetails() {

    const [shopeDetails, setShopeDetails] = useState<ShopData[] | null>(null)

    useEffect(() => {
        const getShopeDetails = async () => {
            try {
                const response = await staffAxios.get(staffApis.shopeDetails)
                console.log("response", response)
                setShopeDetails(response.data)
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
        getShopeDetails()
    }, [])

    function formatDate(dateString: string | number | Date) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateString);

        const formattedDate = date.toLocaleDateString('en-US', options);

        return `${formattedDate}`;
    }

    return (
        <>
            <div className="flex h-screen justify-center mt-9" >

                <div className="w-10/12 overflow-hidden rounded-3xl bg-white shadow-2xl sm:flex justify-center">
                    <div className="w-full ">
                        <div className="p-8">
                            <div className="p-8">
                            </div>



                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                                <table className="w-full text-sm text-left text-white  dark:text-white">
                                    <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-slate-500 dark:text-white border-b-white border-4 font-bold">

                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Shope Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Owner Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Mobile
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                ListedDate
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shopeDetails && shopeDetails.map((items) => (

                                            <tr key={items._id} className=" bg-gray-700 dark:bg-slate-400 border-b  dark:border-gray-900  dark:hover:bg-gray-500">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {items.shopeName}
                                                </th>
                                                <td className="px-6 py-4 dark:text-white">
                                                    {items.ownerName}
                                                </td>
                                                <td className="px-6 py-4 dark:text-white">
                                                    {items.ownerEmail}
                                                </td>
                                                <td className="px-6 py-4 dark:text-white">
                                                    {items.ownerMobile}
                                                </td>
                                                <td className="px-6 py-4 dark:text-white">
                                                    {formatDate(items.listedDate)}
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


export default ShopesDetails