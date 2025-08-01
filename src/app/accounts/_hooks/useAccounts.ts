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
        },
        onError: (error) => {
            console.log('❌ Create failed:', error); // Add this
        }
    })
 }
const useUpdateAccount = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts']});
        },
        onError: (error) => {
            console.log('❌ Update failed:', error); // Add this
        }
    })
 }

const useDeleteAccount = () => { 
     const queryClient = useQueryClient();

  return useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['accounts']});
        },
        onError: (error) => {
            console.log('❌ Delete failed:', error); // Add this
        }
    });
 }


export {
    useAccounts,
    useCreateAccount,
    useUpdateAccount,
    useDeleteAccount
}