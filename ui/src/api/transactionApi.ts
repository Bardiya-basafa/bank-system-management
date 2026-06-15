import { api } from "./client";

export interface CreateTransactionPayload {
  referenceCode: string;
  sourceAccountId: number;
  targetAccountId: number;
  sourceDeviceId: number;
  transactionType: string;
  amount: number;
}

export interface Transaction {
  transactionId: number;
  referenceCode: string;
  sourceAccountId: number | null;
  targetAccountId: number | null;
  sourceDeviceId: number | null;
  transactionType: string;
  amount: number;
  transactionStatus: string;
  description: string | null;
  issuedAt: string;
  completedAt: string | null;
}

export const getTransactions = () => {
  return api.get("/api/transaction");
};

export const getTransactionById = (id: number) => {
  return api.get(`/api/transaction/${id}`);
};

export const createTransaction = (data: CreateTransactionPayload) => {
  return api.post("/api/transaction", data);
};