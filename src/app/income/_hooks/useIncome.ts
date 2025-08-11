"use client";
import { Income } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createIncome, deleteIncome, fetchIncome, updateIncome } from "../_api/income";



const useIncome = (initalData: Income[]) => {
    return useQuery({
        queryKey: ['income'],
        queryFn: fetchIncome,
        initialData: initalData,
    })
}

const useCreateIncome = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createIncome,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['income']});
        },
        onError: (error) => {
            console.log('❌ Create failed:', error); // Add this
        }
    })
 }
const useUpdateIncome = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateIncome,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['income']});
        },
        onError: (error) => {
            console.log('❌ Update failed:', error); // Add this
        }
    })
 }

const useDeleteIncome = () => { 
     const queryClient = useQueryClient();

  return useMutation({
        mutationFn: deleteIncome,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['income']});
        },
        onError: (error) => {
            console.log('❌ Delete failed:', error); // Add this
        }
    });
 }


export {
    useIncome,
    useCreateIncome,
    useUpdateIncome,
    useDeleteIncome
}