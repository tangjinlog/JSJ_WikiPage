import { wikiListState, wikiSelectedState } from 'context/atom';
import { useRecoilValue } from 'recoil';
import WikiItem from '@molecules/WikiItem';
import type { WikiContainerPropTypes } from '@organisms/Wiki/Wiki';

export function WikiListContainer({
	isFetching,
	setPage,
}: WikiContainerPropTypes) {
	//TODO: recoil로 data 가져오기
	const isSelected = useRecoilValue(wikiSelectedState);

	return (
		<div
			className={`absolute ${isSelected ? `left-0` : `left-[100%]`} w-[calc(100%-80px)] h-full border-green-200 border-blue`}
		>
			<WikiItem.Title>title</WikiItem.Title>
			<WikiItem.Author>author</WikiItem.Author>
		</div>
	);
}
