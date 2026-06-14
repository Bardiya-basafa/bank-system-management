import { api } from "./client";

export const getCustomers = () =>
  api.get("/api/customer");

export const getCustomerAccounts = (id:number) =>
  api.get(`/api/customer/account/${id}`);

export const getCustomerById = (id:number) =>
  api.get(`/api/customer/${id}`);

