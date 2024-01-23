import { useTextInput } from '@atoms/Input';
import { useRecoilValue } from 'recoil';
import { wikiItemState } from 'context/atom';
import { usePatchWikiItem, usePostWikiItem } from '@queries/wiki/hooks';
import type { UseInputResponse } from '@atoms/Input/Input';
//TODO: Edit boolean -> initValue 적용
// 기존 wiki 제목 배열들 불러와서 onChange value에서 일치하는지 검사
// 일치한다면 annotaion 띄우고 엔터시 링크 적용.

interface WikiFormPropTypes {
	id: string | string[] | undefined;
	lastIdx: number | undefined;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function WikiForm({ id, lastIdx, isEditing, setIsEditing }: WikiFormPropTypes) {
	const {
		data: postData,
		mutateAsync: postMutate,
		isPending: isPostPending,
	} = usePostWikiItem();

	const {
		data: patchData,
		mutateAsync: patchMutate,
		isPending: isPatchPending,
	} = usePatchWikiItem();

	const editingWiki = useRecoilValue(wikiItemState);
	const [title, titleInput, setTitle] = useTextInput({
		initValue: editingWiki && editingWiki.title,
		autoFocus: true,
		required: true,
	});
	const [content, contentInput, setContent] = useTextInput({
		initValue: editingWiki && editingWiki.content,
		required: true,
	});

	const submitHandler = () => {
		if (!id) {
			postMutate({
				id: `${(lastIdx as number) + 1}`,
				author: '정상진',
				title: title,
				content: content,
			});
		} else {
			patchMutate({
				id: id as string,
				author: '정상진',
				title: title,
				content: content,
			});
		}
		setIsEditing(false);
		setTitle('');
		setContent('');
	};

	return (
		<form onSubmit={submitHandler}>
			{titleInput as React.ReactNode}
			{contentInput as React.ReactNode}
			<div>
				<button>{isEditing && !id ? `등록` : `완료`}</button>
			</div>
		</form>
	);
}

export default WikiForm;
