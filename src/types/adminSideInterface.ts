export interface staffs {
    _id: string;
    adminApproved: boolean;
    blocked: boolean;
    email: string;
    mobile: string;
    name: string;
    totalShops: number;
}

export interface adminDashboard {
    totalShops: string,
    totalStaffs: string,
}