import api from 'queries/config';

interface JsonServerResponse {
	first: number;
	items: number;
	last: number;
	next: number | null;
	pages: number;
	prev: number | null;
}

export interface WikiListTypes {
	id: string;
	author: string;
	title: string;
	content: string;
}

export interface WikiListResponse extends JsonServerResponse {
	data: WikiListTypes[];
}

const getWikiList = async (page: number = 1): Promise<WikiListResponse> => {
	const defaultLenth = 5;
	try {
		const res = await api.get(`/wiki?_page=${page}&_per_page=${defaultLenth}`);
		return res.data;
	} catch (error) {
		throw error;
	}
};

const postWikiItem = async (wiki: WikiListTypes): Promise<WikiListResponse> => {
	try {
		const res = await api.post(`/wiki`, {
			id: wiki.id,
			author: '정상진',
			title: wiki.title,
			content: wiki.content,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
};

const patchWikiItem = async (
	wiki: WikiListTypes,
): Promise<WikiListResponse> => {
	try {
		const res = await api.patch(`/wiki/${wiki.id}`, {
			id: wiki.id,
			author: '정상진',
			title: wiki.title,
			content: wiki.content,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
};

export const orderHandlers = {
	getWikiList,
	postWikiItem,
	patchWikiItem,
};
