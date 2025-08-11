"use client";
import { Settings } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchSettings, updateSettings } from "../_api/settings";




const useSettings = (initalData: Settings[]) => {
    return useQuery({
        queryKey: ['settings'],
        queryFn: fetchSettings,
        initialData: initalData,
    })
}

const useUpdateSettings = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['settings']});
        },
        onError: (error) => {
            console.log('❌ Update failed:', error); // Add this
        }
    })
 }



export {
    useSettings,
    useUpdateSettings,
}