import { Suspense, useEffect, useState } from "react"
import { ShopData } from "../../../types/staffSideInterface";
import DataTable from "react-data-table-component"
import { adminAxios } from "../../../constraints/axiosIntersepter/adminIntersepter";
import adminApis from "../../../constraints/apis/adminApis";
import { handleErrors } from "../../../constraints/errorHandler";


function ShopesDetails() {

    const [shopeDetails, setShopeDetails] = useState<ShopData[]>([])

    useEffect(() => {
        const getShopeDetails = async () => {
            try {
                const response = await adminAxios.get(adminApis.shopesDetails)
                console.log("response", response)
                setShopeDetails(response.data)
            } catch (error) {
                console.log(error);
                handleErrors(error)
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


export default ShopesDetails