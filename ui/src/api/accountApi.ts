import { api } from "./client";

export interface CreateAccountPayload {
  customerId: number;
  currencyId: number;
  accountType: string;
  balance: number;
  accountStatus: string;
}

export const clientcreateAccount = (data: CreateAccountPayload) => {
  return api.post("/api/account", data);
};

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