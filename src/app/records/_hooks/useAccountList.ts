import { useQuery } from "@tanstack/react-query";
import { fetchAccountList } from "../_api/accounts";

type AccountList = {
    id: string;
    name: string;
}

export const useAccountList = (initialData: AccountList[]) => {
    return useQuery({
        queryKey: ['account_list'],
        queryFn: fetchAccountList,
        initialData: initialData
    });
}