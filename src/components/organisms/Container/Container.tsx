import {
	wikiItemState,
	wikiListState,
	wikiPageState,
	wikiTabSelectedState,
	wikiFormContentState,
} from '@context/atom';
import {
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
	useResetRecoilState,
} from 'recoil';
import WikiItem from '@molecules/WikiItem';
import Pagination from '@molecules/Pagination';
import Loading from '@molecules/Loading';
import type { WikiContainerPropTypes } from '@organisms/Wiki/Wiki';
import Button from '@atoms/Button';
import WikiForm from '@organisms/WikiForm';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import LinkButton from '@atoms/LinkButton';

export function WikiListContainer({
	isFetching,
	setPage,
}: WikiContainerPropTypes) {
	const wikiList = useRecoilValue(wikiListState);
	const setWikiItem = useSetRecoilState(wikiItemState);
	const resetWikiItem = useResetRecoilState(wikiItemState);
	const pageInfo = useRecoilValue(wikiPageState);
	const [isSelected, setIsSelected] = useRecoilState(wikiTabSelectedState);
	const isContentEmpty = useRecoilValue(wikiFormContentState);
	const [isEditing, setIsEditing] = useState(false);

	const router = useRouter();

	const { id } = router.query;

	useEffect(() => {
		if (id && wikiList) {
			const wiki = wikiList.filter((wiki) => wiki.id === id)[0];
			setWikiItem(wiki);
		}
		return () => {
			resetWikiItem();
		};
	}, [id]);

	console.log('isEditing', isEditing);
	return (
		<div
			className={`absolute flex-column gap-6 ${isSelected ? `md:left-0 md:w-[calc(100%-80px)] md:h-full md:bottom-0 sm:bottom-[56px] sm:h-[90vh]` : `md:left-[100%] sm:bottom-[-100vh]`}  p-4 bg-slate-100 sm:w-[100vw]`}
		>
			<div className="flex-center relative  gap-5">
				{id ? (
					<Button
						className="absolute left-0 p-2"
						onClick={() => {
							router.back();
						}}
					>
						{isEditing ? `취소` : `뒤로`}
					</Button>
				) : isEditing ? (
					<Button
						className="absolute left-0 p-2"
						onClick={() => {
							router.back();
							isContentEmpty ? setIsEditing(false) : null;
						}}
					>
						취소
					</Button>
				) : (
					<Button
						className="absolute left-0 p-2"
						onClick={() => {
							setIsEditing(false);
							setIsSelected(false);
						}}
					>
						X
					</Button>
				)}
				<h2 className="p-2 text-xl">위키 게시판</h2>
				{!id ? (
					<LinkButton
						href={`/wiki?tab=wiki&create=true`}
						className={`${isEditing ? `hidden` : `inline-block`} absolute right-0 p-2`}
						onClick={() => setIsEditing(true)}
					>
						{!isEditing ? `생성` : null}
					</LinkButton>
				) : (
					<Button
						className={`${isEditing ? `hidden` : `inline-block`} absolute right-0 p-2`}
						onClick={() => {
							setIsEditing(true);
						}}
					>
						{!isEditing ? `수정` : null}
					</Button>
				)}
			</div>

			{/*TODO: 폼*/}
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
										className="p-4 bg-white rounded-xl cursor-pointer  transition-transform hover:-translate-y-2"
										onClick={() => router.push(`/wiki?tab=wiki&id=${wiki.id}`)}
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
					<div className="flex-center">
						<Pagination setPage={setPage} />
					</div>
				</>
			) : !isEditing ? (
				wikiList
					.filter((wiki) => wiki.id === id)
					.map((wiki) => {
						return (
							<div key={wiki.id} className="p-4 bg-white rounded-xl">
								<WikiItem>
									<WikiItem.Count>{`#${wiki.id}`}</WikiItem.Count>
									<WikiItem.Title>{wiki.title}</WikiItem.Title>
									<WikiItem.Content>{wiki.content}</WikiItem.Content>
									<WikiItem.Author>{wiki.author}</WikiItem.Author>
								</WikiItem>
							</div>
						);
					})
			) : null}
		</div>
	);
}
