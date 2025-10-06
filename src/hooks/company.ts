import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCompanyService, listCompaniesService, createModelService, listModelsService } from '../services/company';
import type { TCreateCompanyRequest, TCreateModelRequest } from '../types/company';

export const useCompanies = (params?: { page?: number; limit?: number; search?: string; userId?: string }) => {
    return useQuery({
        queryKey: ['companies', params],
        queryFn: () => listCompaniesService(params),
    });
};

export const useCreateCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TCreateCompanyRequest) => createCompanyService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
};

export const useModels = (params?: { page?: number; limit?: number; search?: string; companyId?: string; userId?: string }) => {
    return useQuery({
        queryKey: ['models', params],
        queryFn: () => listModelsService(params),
        enabled: !!params?.companyId, // only fetch when companyId provided
    });
};

export const useCreateModel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TCreateModelRequest) => createModelService(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['models'] });
            if (variables.companyId) {
                queryClient.invalidateQueries({ queryKey: ['models', { companyId: variables.companyId }] });
            }
        },
    });
};


