import { api } from "./client";

export interface Customer {
  customerId: number;
  customerType: string;
  phone: string;
  email: string;
  status?: string;
}
export interface CreateCustomerPayload {
  customerType: string;
  phone: string;
  email: string;
  Password: string;
  status: string;
}

export interface UpdateCustomerPayload {
  customerId: number;
  customerType: string;
  phone: string;
  email: string;
  passwordHash: string;
  status: string;
}

export const getCustomers = () =>
  api.get("/api/customer");

export const getCustomerAccounts = (id:number) =>
  api.get(`/api/customer/account/${id}`);

export const getCustomerById = (id:number) =>
  api.get(`/api/customer/${id}`);

export const createCustomer = (data: CreateCustomerPayload) => {
  return api.post("/api/customer", data);
};

export const updateCustomer = (data: UpdateCustomerPayload) => {
  return api.put("/api/customer", data);
};