import { atom } from 'recoil';

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

export const wikiSelectedState = atom({
	key: `wikiSelectedState`,
	default: false,
});
