export interface staffs {
    adminApproved: boolean;
    blocked: boolean;
    email: string;
    mobile: string;
    name: string;
    totalShops: number;
    _id: string;
}

export interface adminDashboard {
    totalShops: string,
    totalStaffs: string,
}