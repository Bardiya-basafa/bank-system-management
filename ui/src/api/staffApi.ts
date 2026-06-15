import { api } from "./client";

export interface UpdateStaffPayload {
  staffId: number;
  firstName: string;
  lastName: string;
  ssn: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: string;
  address: string;
  hireDate: string;
  terminationDate: string | null;
  branchId: number;
  status: string;
}

export const getStaff = () =>
  api.get("/api/staff");

export const getStaffById = (id:number) =>
  api.get(`/api/staff/${id}`);

export const deleteStaff = (id:number) =>
  api.delete(`/api/staff/${id}`);

export const createStaff = (data:any) =>
  api.post("/api/staff", data);

export const updateStaff = (data: UpdateStaffPayload) => {
  return api.put("/api/staff", data);
};