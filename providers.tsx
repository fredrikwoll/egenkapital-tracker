"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfirmationProvider } from "@/contexts/ConfirmationContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Settings } from "@prisma/client";

const queryClient = new QueryClient();

type ProvidersProps = {
    children: React.ReactNode;
    initialSettings?: Settings;
};

export default function Providers({ children, initialSettings }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SettingsProvider initialSettings={initialSettings}>
                <ConfirmationProvider>
                    {children}
                </ConfirmationProvider>
            </SettingsProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
