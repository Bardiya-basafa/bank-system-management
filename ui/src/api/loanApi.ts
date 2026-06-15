import { api } from "./client";

export interface Loan {
  loanId: number;
  accountId: number;
  guarantorCustomerId: number;
  amount: number;
  interestRate: number;
  loanTermMonths: number;
  repaymentStatus: string;
  issueDate: string;
}

export interface CreateLoanPayload {
  accountId: number;
  guarantorCustomerId: number;
  amount: number;
  interestRate: number;
  loanTermMonths: number;
  repaymentStatus: string;
}

export const getLoans = () => {
  return api.get("/api/loan");
};

export const getLoanById = (id: number) => {
  return api.get(`/api/loan/${id}`);
};

export const createLoan = (data: CreateLoanPayload) => {
  return api.post("/api/loan", data);
};