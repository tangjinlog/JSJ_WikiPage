import { useFetchWikiList } from '@queries/wiki/hooks';
import { useEffect, useState } from 'react';
import { wikiListState, wikiPageState } from '@context/atom';
import { useSetRecoilState } from 'recoil';
import { QueryClient } from '@tanstack/react-query';
import { wikiKey } from '@queries/constants';
import { orderHandlers } from '@queries/wiki';

export function WikiListItemFetcher({
	children,
}: {
	children: React.ReactNode | Function;
}) {
	const [page, setPage] = useState(1);
	const setList = useSetRecoilState(wikiListState);
	const setPageInfo = useSetRecoilState(wikiPageState);

	const { data, status, isFetching, isPlaceholderData, pageInfo } =
		useFetchWikiList(page);

	const queryClient = new QueryClient();

	useEffect(() => {
		console.log(`data`, data);
		data && setList(data);
		pageInfo && setPageInfo(pageInfo);
	}, [data]);

	useEffect(() => {
		if (!isPlaceholderData && pageInfo?.hasMore) {
			queryClient.prefetchQuery({
				queryKey: [...wikiKey.list(), page + 1],
				queryFn: () => orderHandlers.getWikiList(page + 1),
			});
		}
	}, [data, isPlaceholderData, page, queryClient]);

	if (status === 'error') {
		throw new Error('목록을 불러오는 도중 에러가 발생했습니다.');
	}

	const toRender =
		typeof children === 'function'
			? children({ isFetching, setPage })
			: children;

	return <>{toRender}</>;
}
