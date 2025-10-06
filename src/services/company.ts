import api from '../config/api';
import type {
    TCreateCompanyRequest,
    TCompanyResponse,
    TCompaniesListResponse,
    TCreateModelRequest,
    TModelResponse,
    TModelsListResponse,
    TCreateCompanyService,
    TListCompaniesService,
    TCreateModelService,
    TListModelsService,
} from '../types/company';

export const createCompanyService: TCreateCompanyService = async (data: TCreateCompanyRequest) => {
    const response = await api.post<TCompanyResponse>('/api/companies', data);
    return response.data;
};

export const listCompaniesService: TListCompaniesService = async (params) => {
    const response = await api.get<TCompaniesListResponse>('/api/companies', { params });
    return response.data;
};

export const createModelService: TCreateModelService = async (data: TCreateModelRequest) => {
    const response = await api.post<TModelResponse>('/api/models', data);
    return response.data;
};

export const listModelsService: TListModelsService = async (params) => {
    const response = await api.get<TModelsListResponse>('/api/models', { params });
    return response.data;
};


