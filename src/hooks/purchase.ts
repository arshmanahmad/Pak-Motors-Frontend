import { createPurchaseService, getPurchasesService } from "../services/purchase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TPurchaseCreateRequest } from "../types/purchase";

export const usePurchases = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['purchases'],
        queryFn: getPurchasesService,
    });

    return { data, isLoading, error };
};

export const useCreatePurchase = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: (data: TPurchaseCreateRequest) => createPurchaseService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchases'] });
        },
    });

    return mutation;
};