"use client";
import { Account } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { fetchAccounts } from "../_api/accounts"



const useAccounts = (initalData: Account[]) => {
    return useQuery({
        queryKey: ['accounts'],
        queryFn: fetchAccounts,
        initialData: initalData,
    })
}

const useCreateAccount = () => { /* mutation */ }
const useUpdateAccount = () => { /* mutation */ }
const useDeleteAccount = () => { /* mutation */ }


export {
    useAccounts,
    useCreateAccount,
    useUpdateAccount,
    useDeleteAccount
}