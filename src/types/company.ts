export interface ICompany {
    id: string;
    userId: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IModel {
    id: string;
    userId: string;
    companyId: string | { id: string; name: string };
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TCreateCompanyRequest {
    name: string;
    description?: string;
    userId: string;
}

export interface TCompanyResponse {
    success: boolean;
    message: string;
    data: ICompany | null;
}

export interface TCompaniesListResponse {
    success: boolean;
    message: string;
    data: {
        companies: ICompany[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    } | null;
}

export interface TCreateModelRequest {
    name: string;
    description?: string;
    companyId: string;
    userId: string;
}

export interface TModelResponse {
    success: boolean;
    message: string;
    data: IModel | null;
}

export interface TModelsListResponse {
    success: boolean;
    message: string;
    data: {
        models: IModel[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    } | null;
}

export type TCreateCompanyService = (data: TCreateCompanyRequest) => Promise<TCompanyResponse>;
export type TListCompaniesService = (params?: { page?: number; limit?: number; search?: string; userId?: string }) => Promise<TCompaniesListResponse>;

export type TCreateModelService = (data: TCreateModelRequest) => Promise<TModelResponse>;
export type TListModelsService = (params?: { page?: number; limit?: number; search?: string; companyId?: string; userId?: string }) => Promise<TModelsListResponse>;


