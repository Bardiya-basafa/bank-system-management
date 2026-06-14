import { api } from "./client";

export const getStaff = () =>
  api.get("/api/staff");

export const getStaffById = (id:number) =>
  api.get(`/api/staff/${id}`);

export const deleteStaff = (id:number) =>
  api.delete(`/api/staff/${id}`);

export const createStaff = (data:any) =>
  api.post("/api/staff", data);