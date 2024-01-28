import { atom, atomFamily } from 'recoil';

export const wikiListState = atom({
	key: `wikiListState`,
	default: [
		{
			id: '',
			author: '',
			title: '',
			content: '',
		},
	],
});

export const wikiItemState = atomFamily({
	key: `wikiItemState`,
	default: {
		id: '',
		author: '',
		title: '',
		content: '',
	},
});

export const wikiTabSelectedState = atom({
	key: `wikiTabSelectedState`,
	default: false,
});

export const wikiFormContentState = atom({
	key: `wikiFormContentState`,
	default: true,
});

type WikiPageStateTypes = {
	totalPages: number | undefined;
	currentPage: number | undefined;
	hasMore: boolean | undefined;
	lastIdx: number | undefined;
};

export const wikiPageState = atom<WikiPageStateTypes>({
	key: `wikiPageState`,
	default: {
		totalPages: 0,
		currentPage: 0,
		hasMore: false,
		lastIdx: 0,
	},
});
