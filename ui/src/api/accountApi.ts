import { api } from "./client";

export interface CreateAccountPayload {
  accountNumber: string;
  currencyId: number;
  accountType: string;
  balance: number;
  accountStatus: string;
}

export const clientcreateAccount = (customerId: number, data: CreateAccountPayload) => {
  return api.post(`/api/account/${customerId}`, data);
};

export const getAccounts = () => {
  return api.get("/api/account");
};

export const getAccountById = (id: number) => {
  return api.get(`/api/account/${id}`);
};

export const deleteAccount = (id: number) => {
  return api.delete(`/api/account/${id}`);
};

export const createAccount = (
  customerId:number,
  account:any
) =>
  api.post(`/api/account/${customerId}`, account);