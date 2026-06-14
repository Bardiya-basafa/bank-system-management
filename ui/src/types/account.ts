export interface Account {
    accountId:number;
    accountNumber:string;
    currencyId:number;
    accountType:string;
    balance:number;
    accountStatus:string;
    createdAt:string;
    updatedAt:string;
    closedAt:string | null;
  }