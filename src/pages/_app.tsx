import '@styles/globals.css';
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 0,
						refetchOnWindowFocus: false,
						throwOnError: true,
					},
					mutations: {
						retry: 0,
						throwOnError: true,
					},
				},
			}),
	);
	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
