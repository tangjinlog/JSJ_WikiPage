import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { orderHandlers } from '@queries/wiki';
import { wikiKey } from '@queries/constants';
import type { WikiListResponse } from '@queries/wiki';

export const useFetchWikiList = (page: number) => {
	const { data, status, isFetching } = useQuery<WikiListResponse>({
		queryKey: [...wikiKey.list(), page],
		queryFn: () => orderHandlers.getWikiList(page),
		placeholderData: keepPreviousData,
		staleTime: 5000,
	});

	return { data, status, isFetching };
};
