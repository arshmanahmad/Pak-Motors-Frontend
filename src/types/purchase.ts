export interface IPurchase {
    id: string;
    serialNo: string;
    company: string;
    model: string;
    engineNumber: string;
    chasisNumber: string;
    registration: string;
    isNew: boolean;
    horsePower: string;
    color: string;
    invoiceName?: string;
    invoiceDate?: string;
    receiveDate?: string;
    invoiceReceived: boolean;
    invoiceDelivered: boolean;
    warrantyBook: boolean;
    warrantyBookDelivered: boolean;
    sphereKey: boolean;
    document: boolean;
    purchaseAmount: number;
    attachedDocuments: string[];
    purchaseFrom: string;
    witness: string;
    note?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface TPurchaseCreateRequest {
    serialNo: string;
    company: string;
    model: string;
    engineNumber: string;
    chasisNumber: string;
    registration: string;
    isNew?: boolean;
    horsePower: string;
    color: string;
    invoiceName?: string;
    invoiceDate?: string;
    receiveDate?: string;
    invoiceReceived?: boolean;
    invoiceDelivered?: boolean;
    warrantyBook?: boolean;
    warrantyBookDelivered?: boolean;
    sphereKey?: boolean;
    document?: boolean;
    purchaseAmount: number;
    attachedDocuments?: string[];
    purchaseFrom: string;
    witness: string;
    note?: string;
}

export interface TPurchaseResponse {
    success: boolean;
    message: string;
    data: IPurchase | null;
}

export interface TPurchaseListResponse {
    success: boolean;
    message: string;
    data: IPurchase[];
    total: number;
    page: number;
    limit: number;
}

export type TPurchaseCreateService = (data: TPurchaseCreateRequest) => Promise<TPurchaseResponse>;
export type TPurchaseListService = () => Promise<TPurchaseListResponse>;