import Button from '@atoms/Button';
import LinkButton from '@atoms/LinkButton';
import usePagination from '@utils/hooks/usePagination';
import { wikiPageState } from '@context/atom';
import { useRecoilValue } from 'recoil';

interface PaginationPropTypes {
	setPage: (pageNumber: number) => React.Dispatch<React.SetStateAction<number>>;
}

export const dotts = `...`;

const Pagination = ({ setPage }: PaginationPropTypes) => {
	const { totalPages, currentPage, hasMore } = useRecoilValue(wikiPageState);

	const pages = usePagination(totalPages ?? 1, currentPage ?? 1);

	console.log(currentPage);
	return (
		<div className="flex gap-5">
			{pages.map((pageNumber, i) =>
				pageNumber === dotts ? (
					<span key={i}>{pageNumber}</span>
				) : (
					<Button
						key={i}
						className={`${currentPage == pageNumber ? `text-blue-600` : `text-black`}`}
						onClick={() => {
							return setPage && setPage(pageNumber as number);
						}}
					>
						{pageNumber}
					</Button>
				),
			)}
		</div>
	);
};

export default Pagination;
