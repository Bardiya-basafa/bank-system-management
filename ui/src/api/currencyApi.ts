import { api } from "./client";

export interface Currency {
  currencyId: number;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  isForeign: boolean;
}

export type CreateCurrencyPayload = Omit<Currency, 'currencyId'>;

export const getCurrencies = () => {
  return api.get("/api/currency");
};

export const createCurrency = (data: CreateCurrencyPayload) => {
  return api.post("/api/currency", data);
};

export const deleteCurrency = (id: number) => {
  return api.delete(`/api/currency/${id}`);
};

export const updateCurrency = (data: Currency) => {
  return api.put("/api/currency", data);
};