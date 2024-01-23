import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query';
import { orderHandlers } from '@queries/wiki';
import { wikiKey } from '@queries/constants';
import { useQueryClient } from '@tanstack/react-query';
import type { WikiListResponse, WikiListTypes } from '@queries/wiki';

export const useFetchWikiList = (page: number = 1) => {
	const { data, status, isFetching, isPlaceholderData } =
		useQuery<WikiListResponse>({
			queryKey: [...wikiKey.list(), page],
			queryFn: () => orderHandlers.getWikiList(page),
			placeholderData: keepPreviousData,
			staleTime: 5000,
		});

	const pageInfo = {
		totalPages: data && data?.pages,
		currentPage: data && (data.next == null ? data.last : data.next - 1),
		hasMore: data && !!data?.next,
		lastIdx: data && data.items,
	};

	return {
		data: data?.data.slice(0, 5),
		status,
		isFetching,
		isPlaceholderData,
		pageInfo,
	};
};

export const usePostWikiItem = () => {
	const queryClient = useQueryClient();
	const { data, mutateAsync, isPending } = useMutation({
		mutationKey: [...wikiKey.post()],
		mutationFn: (wiki: WikiListTypes) => orderHandlers.postWikiItem(wiki),
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: [...wikiKey.list()] });
		},
	});
	return { data, mutateAsync, isPending };
};

export const usePatchWikiItem = () => {
	const queryClient = useQueryClient();
	const { data, mutateAsync, isPending } = useMutation({
		mutationKey: [...wikiKey.patch()],
		mutationFn: (wiki: WikiListTypes) => orderHandlers.patchWikiItem(wiki),
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: [...wikiKey.list()] });
		},
	});
	return { data, mutateAsync, isPending };
};
