"use client";

import { AccountRecord } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecord, deleteRecord, fetchRecords, updateRecord } from "../_api/records";

const useRecords = (initalData: AccountRecord[]) => {
    return useQuery({
        queryKey: ['records'],
        queryFn: fetchRecords,
        initialData: initalData

    });
}

const useCreateRecord = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['records']});
        },
        onError: (error) => {
            console.log('❌ Create failed:', error);
        }
    });
}

const useUpdateRecord = () => { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['records']});
        },
        onError: (error) => {
            console.log('❌ Update failed:', error); // Add this
        }
    })
 }

 const useDeleteRecord = () => { 
      const queryClient = useQueryClient();
 
   return useMutation({
         mutationFn: deleteRecord,
         onSuccess: () => {
             queryClient.invalidateQueries({queryKey: ['records']});
         },
         onError: (error) => {
             console.log('❌ Delete failed:', error); // Add this
         }
     });
  }



export {
    useRecords,
    useCreateRecord,
    useUpdateRecord,
    useDeleteRecord
}