"use client";
import { Account } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAccount, deleteAccount, fetchAccounts, updateAccount } from "../_api/accounts"



const useAccounts = (initalData: Account[]) => {
    return useQuery({
        queryKey: ['accounts'],
        queryFn: fetchAccounts,
        initialData: initalData,
    })
}

const useCreateAccount = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts']});
        }
    })
 }
const useUpdateAccount = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts']});
        }
    })
 }

const useDeleteAccount = () => { 
     const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts']});
        }
    })
 }


export {
    useAccounts,
    useCreateAccount,
    useUpdateAccount,
    useDeleteAccount
}