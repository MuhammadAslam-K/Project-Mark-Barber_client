import axios, { AxiosError } from "axios";
import { Suspense, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { ErrorResponse } from "../../../types/errorInterfaces";
import { staffAxios } from "../../../constraints/axiosIntersepter/staffIntersepter";
import staffApis from "../../../constraints/apis/staffApis";
import { ShopData } from "../../../types/staffSideInterface";

import DataTable from "react-data-table-component"


function ShopesDetails() {

    const [shopeDetails, setShopeDetails] = useState<ShopData[]>([])

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

    const columns = [

        {
            name: 'Shop Name',
            selector: (row: ShopData) => row.shopeName,
        },
        {
            name: 'Owner Name',
            selector: (row: ShopData) => row.ownerName,
        },
        {
            name: 'Email',
            selector: (row: ShopData) => row.ownerEmail,
        },
        {
            name: 'Mobile',
            selector: (row: ShopData) => row.ownerMobile,
        },
        {
            name: 'Listed Date',
            selector: (row: ShopData) => formatDate(row.listedDate),
        },

    ]

    return (
        <>
            <div className="mt-10 lg:w-10/12 w-full mx-auto bg-white p-6 rounded-3xl shadow-2xl justify-center">
                <div className="border-b border-gray-200">
                    <Suspense>
                        {shopeDetails &&
                            <DataTable
                                style={{ zIndex: '-1' }}
                                columns={columns}
                                data={shopeDetails}
                                fixedHeader
                                highlightOnHover
                                pagination
                            />
                        }
                    </Suspense>
                </div>
            </div >
        </>
    )
}


export default ShopesDetails