import { api } from "./client";

export interface Branch {
  branchId: number;
  branchCode: string;
  branchName: string;
  city: string;
  address: string;
  establishDate: string;
  status: string;
}

export type CreateBranchPayload = Omit<Branch, 'branchId'>;

export interface BranchResponse {
  branches: Branch[];
}

export const getBranches = () => {
  return api.get<BranchResponse>("/api/branch");
};

export const createBranch = (data: CreateBranchPayload) => {
  return api.post("/api/branch", data);
};

// NEW: DELETE request to remove a branch
export const deleteBranch = (id: number) => {
  return api.delete(`/api/branch/${id}`);
};