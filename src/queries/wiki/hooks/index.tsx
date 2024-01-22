import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { orderHandlers } from '@queries/wiki';
import { wikiKey } from '@queries/constants';

export const useFetchWikiList = (page: number) => {
	const { data, status, isFetching } = useQuery({
		queryKey: [...wikiKey.list(), page],
		queryFn: () => orderHandlers.getWikiList(page),
		placeholderData: keepPreviousData,
		staleTime: 5000,
	});

	return { data, status, isFetching };
};
