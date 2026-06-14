import { api } from "./client";

export const getAccounts = () =>
  api.get("/api/account");

export const getAccountById = (id:number) =>
  api.get(`/api/account/${id}`);

export const deleteAccount = (id:number) =>
  api.delete(`/api/account/${id}`);

export const createAccount = (
  customerId:number,
  account:any
) =>
  api.post(`/api/account/${customerId}`, account);