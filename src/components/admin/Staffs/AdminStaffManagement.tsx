import { useEffect, useState } from 'react'
import DataTable from "react-data-table-component"
import { handleErrors } from '../../../constraints/errorHandler';
import { adminAxios } from '../../../constraints/axiosIntersepter/adminIntersepter';
import adminApis from '../../../constraints/apis/adminApis';
import { staffs } from "../../../types/adminSideInterface";



function AdminStaffManagement() {


    const [approvedStaffs, SetApprovedStaffs] = useState<staffs[]>([])
    const [notApprovedStaffs, SetNotApprovedStaffs] = useState<staffs[]>([])

    const [staffs, SetStaffs] = useState(true)
    const [refresh, SetRefresh] = useState(false)


    const current_tab = "cursor-pointer bg-gray-300  text-gray-700  py-2 px-4 rounded-t-lg active:bg-white focus:outline-none focus:ring focus:ring-indigo-300"
    const pre_tab = "cursor-pointer border-gray-400 border-2  text-gray-700 hover:bg-white py-2 px-4 rounded-t-lg active:bg-white focus:outline-none focus:ring focus:ring-indigo-300"


    useEffect(() => {
        const fetchApproveStaffs = async () => {
            try {
                const response = await adminAxios.get(adminApis.staffs)
                console.log("response", response)
                SetApprovedStaffs(response.data.approvedStaff)
                SetNotApprovedStaffs(response.data.notApprovedStaff)
            } catch (error) {
                console.log(error);
                handleErrors(error)
            }
        }
        fetchApproveStaffs()
    }, [refresh])


    const getButtonColor = (approvedStaffs: staffs) => {
        const red = "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  m-2"
        const blue = "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        return approvedStaffs.blocked ? red : blue;
    };

    const handleBlock = async (id: staffs) => {
        try {
            await adminAxios.patch(`${adminApis.blockUnblockStaffs}?id=${id._id}`)
            SetRefresh(!refresh)

        } catch (error) {
            console.log(error)
            handleErrors(error)
        }
    }

    const handleApproveStaff = async (id: string) => {
        try {
            await adminAxios.patch(`${adminApis.approveStaff}?id=${id}`)
            SetRefresh(!refresh)
        } catch (error) {
            console.log(error)
            handleErrors(error)
        }
    }


    const approvedColumns = [
        {
            name: 'Name',
            selector: (row: staffs) => row.name,
        },
        {
            name: 'Email',
            selector: (row: staffs) => row.email,
        },
        {
            name: 'Mobile',
            selector: (row: staffs) => row.mobile,
        },
        {
            name: 'Total Shopes',
            selector: (row: staffs) => row.totalShops,
        },
        {
            name: 'Action',
            cell: (row: staffs) => (
                <button
                    className={getButtonColor(row)}
                    onClick={() => handleBlock(row)}
                >
                    {row.blocked ? 'Unblock' : 'Block'}
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const notApprovedColumns = [
        {
            name: 'Name',
            selector: (row: staffs) => row.name,
        },
        {
            name: 'Email',
            selector: (row: staffs) => row.email,
        },
        {
            name: 'Mobile',
            selector: (row: staffs) => row.mobile,
        },
        {
            name: 'Action',
            cell: (row: staffs) => (
                <button
                    onClick={() => handleApproveStaff(row._id)}
                    className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  m-2'
                >
                    Approve
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div className="mt-10 w-10/12 ms-32 bg-white p-6 rounded-3xl shadow-2xl justify-center">
            <div className="border-b border-gray-200">
                <ul className="flex" role="tablist">
                    <li className="mr-1">
                        <p
                            onClick={() => SetStaffs(true)}
                            className={staffs ? current_tab : pre_tab}
                            role="tab"
                            aria-selected="true"
                        >
                            Approved Staffs
                        </p>
                    </li>

                    <li className="mr-1">
                        <p onClick={() => SetStaffs(false)}
                            className={staffs ? pre_tab : current_tab}
                            role="tab"
                            aria-selected="true"
                        >
                            Not Approved Staffs
                        </p>
                    </li>

                </ul>
            </div>

            <DataTable
                style={{ zIndex: '-1' }}
                columns={staffs ? approvedColumns : notApprovedColumns}
                data={staffs ? approvedStaffs : notApprovedStaffs}
                fixedHeader
                highlightOnHover
                pagination
            />
        </div>
    )
}


export default AdminStaffManagement