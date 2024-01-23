import { dotts } from '@molecules/Pagination/Pagination';

const usePagination = (totalPages: number, currentPage: number) => {
	const getPages = (totalLength: number, inc: number = 1) => {
		return Array.from({ length: totalLength }, (_, i) => i + inc);
	};

	if (totalPages <= 5) {
		return getPages(totalPages);
	}

	if (currentPage <= 3) {
		return [1, 2, 3, 4, dotts, totalPages];
	}

	if (currentPage < totalPages - 2) {
		return [
			1,
			dotts,
			Number(currentPage) - 1,
			Number(currentPage),
			Number(currentPage) + 1,
			dotts,
			totalPages,
		];
	}
	return [1, dotts, ...getPages(4, totalPages - 3)];
};

export default usePagination;
