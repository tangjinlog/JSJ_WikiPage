import { useFetchWikiList } from '@queries/wiki/hooks';
import { useEffect, useState } from 'react';
import { wikiListState } from 'context/atom';
import { useSetRecoilState } from 'recoil';

export function WikiListItemFetcher({
	children,
}: {
	children: React.ReactNode | Function;
}) {
	const setList = useSetRecoilState(wikiListState);
	const [page, setPage] = useState(1);
	//TODO: ReactQuery 적용
	const { data, status, isFetching } = useFetchWikiList(page);
	useEffect(() => {
		console.log(`data`, data);
		data && setList(data.wiki);
	}, [data]);

	if (status === 'error') {
		throw new Error('목록을 불러오는 도중 에러가 발생했습니다.');
	}
	const toRender =
		typeof children === 'function' ? children(isFetching, setPage) : children;

	return <>{toRender}</>;
}
