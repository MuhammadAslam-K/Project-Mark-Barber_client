import { Suspense, useEffect, useState } from "react"
import { staffAxios } from "../../../constraints/axiosIntersepter/staffIntersepter";
import staffApis from "../../../constraints/apis/staffApis";
import { personalServicesData } from "../../../types/staffSideInterface";

import DataTable from "react-data-table-component"
import { handleErrors } from "../../../constraints/errorHandler";


function PersonalServicesDetails() {

    const [shopeDetails, setShopeDetails] = useState<personalServicesData[]>([])

    useEffect(() => {
        const getPersonalDetails = async () => {
            try {
                const response = await staffAxios.get(staffApis.personalServiceDetails)
                console.log("response", response)
                setShopeDetails(response.data)
            } catch (error) {
                console.log(error);
                handleErrors(error)
            }
        }
        getPersonalDetails()
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
            selector: (row: personalServicesData) => row.name,
        },
        {
            name: 'Gender',
            selector: (row: personalServicesData) => row.gender,
        },
        {
            name: 'Email',
            selector: (row: personalServicesData) => row.email,
        },
        {
            name: 'Mobile',
            selector: (row: personalServicesData) => row.mobile,
        },
        {
            name: 'Listed Date',
            selector: (row: personalServicesData) => formatDate(row.listedDate),
        },

    ]

    return (
        <>
            <div className="mt-10 w-10/12 ms-32 bg-white p-6 rounded-3xl shadow-2xl justify-center">
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



export default PersonalServicesDetails