import { AppProvider } from "../AppProvider";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "./config";

export const ReactQueryProvider: AppProvider = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}