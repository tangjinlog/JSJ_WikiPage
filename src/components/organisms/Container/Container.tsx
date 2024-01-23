import {
	wikiItemState,
	wikiListState,
	wikiPageState,
	wikiTabSelectedState,
} from 'context/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import WikiItem from '@molecules/WikiItem';
import Pagination from '@molecules/Pagination';
import Loading from '@molecules/Loading';
import type { WikiContainerPropTypes } from '@organisms/Wiki/Wiki';
import Button from '@atoms/Button';
import WikiForm from '@organisms/WikiForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function WikiListContainer({
	isFetching,
	setPage,
}: WikiContainerPropTypes) {
	const wikiList = useRecoilValue(wikiListState);
	const setWikiItem = useSetRecoilState(wikiItemState);
	const pageInfo = useRecoilValue(wikiPageState);
	const isSelected = useRecoilValue(wikiTabSelectedState);
	const [isEditing, setIsEditing] = useState(false);

	const router = useRouter();

	const { id } = router.query;

	useEffect(() => {
		if (id && wikiList) {
			const wiki = wikiList.filter((wiki) => wiki.id === id)[0];
			setWikiItem(wiki);
		}
	}, [id]);

	return (
		<div
			className={`absolute ${isSelected ? `left-0` : `left-[100%]`} w-[calc(100%-80px)] h-full border-green-200 border-blue`}
		>
			<div className="flex gap-5">
				{id ? (
					<Button
						onClick={() => {
							router.back();
							setIsEditing(false);
						}}
					>
						{isEditing ? `취소` : `뒤로`}
					</Button>
				) : isEditing ? (
					<Button
						onClick={() => {
							setIsEditing(false);
						}}
					>
						취소
					</Button>
				) : null}
				<h2 className=" flex justify-end text-xl">위키 게시판</h2>
				{!id ? (
					<Button
						className="justify-end"
						onClick={() => setIsEditing((prev) => !prev)}
					>
						{!isEditing ? `생성` : null}
					</Button>
				) : (
					<Button
						onClick={() => {
							setIsEditing(true);
						}}
					>
						{!isEditing ? `수정` : null}
					</Button>
				)}
			</div>

			{isEditing ? (
				<WikiForm
					id={id}
					lastIdx={pageInfo.lastIdx}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			) : null}

			{isFetching ? (
				<Loading type={'wiki'} />
			) : !isEditing && !id ? (
				<>
					{wikiList
						? wikiList.map((wiki) => {
								return (
									<div
										key={wiki.id}
										className="cursor-pointer hover:border-blue"
										onClick={() =>
											router.push(`${router.asPath}&id=${wiki.id}`)
										}
									>
										<WikiItem>
											<WikiItem.Count>{`#${wiki.id}`}</WikiItem.Count>
											<WikiItem.Title>{wiki.title}</WikiItem.Title>
											<WikiItem.Author>{wiki.author}</WikiItem.Author>
										</WikiItem>
									</div>
								);
							})
						: null}
					<Pagination setPage={setPage} />
				</>
			) : !isEditing ? (
				wikiList
					.filter((wiki) => wiki.id === id)
					.map((wiki) => {
						return (
							<div>
								<WikiItem>
									<WikiItem.Count>{`#${wiki.id}`}</WikiItem.Count>
									<WikiItem.Title>{wiki.title}</WikiItem.Title>
									<WikiItem.Author>{wiki.author}</WikiItem.Author>
									<WikiItem.Content>{wiki.content}</WikiItem.Content>
								</WikiItem>
							</div>
						);
					})
			) : null}
		</div>
	);
}
