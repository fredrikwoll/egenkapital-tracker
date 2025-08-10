"use client";
import { Debt } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDebt, deleteDebt, fetchDebts, updateDebt } from "../_api/debts";



const useDebts = (initalData: Debt[]) => {
    return useQuery({
        queryKey: ['debts'],
        queryFn: fetchDebts,
        initialData: initalData,
    })
}

const useCreateDebt = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDebt,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['debts']});
        },
        onError: (error) => {
            console.log('❌ Create failed:', error); // Add this
        }
    })
 }
const useUpdateDebt = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateDebt,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['debts']});
        },
        onError: (error) => {
            console.log('❌ Update failed:', error); // Add this
        }
    })
 }

const useDeleteDebt = () => { 
     const queryClient = useQueryClient();

  return useMutation({
        mutationFn: deleteDebt,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['debts']});
        },
        onError: (error) => {
            console.log('❌ Delete failed:', error); // Add this
        }
    });
 }


export {
    useDebts,
    useCreateDebt,
    useUpdateDebt,
    useDeleteDebt
}