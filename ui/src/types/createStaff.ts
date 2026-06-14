export interface CreateStaffRequest {
    firstName: string;
    lastName: string;
    ssn: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    address: string;
    hireDate: string;
    terminationDate: string | null;
    branchId: number | null;
    status: string;
  }