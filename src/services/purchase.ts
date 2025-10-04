import api from "../config/api";
import type { TPurchaseCreateService, TPurchaseListService, TPurchaseCreateRequest } from "../types/purchase";

export const createPurchaseService: TPurchaseCreateService = async (data: TPurchaseCreateRequest) => {
    const response = await api.post(`/api/purchases`, data);
    return response.data;
};

export const getPurchasesService: TPurchaseListService = async () => {
    const response = await api.get(`/api/purchases`);
    return response.data;
};