export interface Staff {
    staffId: number;
    firstName: string;
    lastName: string;
    ssn: string;
    email: string;
    phone: string;
    role: string;
    address: string | null;
    hireDate: string;
    terminationDate: string | null;
    branchId: number;
    createdAt: string;
    updatedAt: string;
    status: string;
  }