import { useTextInput, useTextArea } from '@atoms/Input';
import { useRecoilValue } from 'recoil';
import { wikiItemState } from '@context/atom';
import { usePatchWikiItem, usePostWikiItem } from '@queries/wiki/hooks';
import Button from '@atoms/Button';

interface WikiFormPropTypes {
	id: string | string[] | undefined;
	lastIdx: number | undefined;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function WikiForm({ id, lastIdx, isEditing, setIsEditing }: WikiFormPropTypes) {
	const { mutateAsync: postMutate, isPending: isPostPending } =
		usePostWikiItem();

	const { mutateAsync: patchMutate, isPending: isPatchPending } =
		usePatchWikiItem();

	const editingWiki = useRecoilValue(wikiItemState);
	const [title, titleInput, setTitle] = useTextInput({
		initValue: editingWiki && editingWiki.title,
		autoFocus: true,
		placeholder: `제목`,
		required: true,
		className: `block w-full p-4 bg-red-200 rounded-xl outline-none`,
	});
	const [content, textArea, setContent] = useTextArea({
		initValue: editingWiki && editingWiki.content,
		placeholder: `내용`,
		required: true,
		className: ` block w-full min-h-[50vh] p-4 text-start  rounded-xl outline-none resize-none`,
	});

	const submitHandler = () => {
		console.log('ha');
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
		<form onSubmit={submitHandler} className="flex-column gap-4">
			{titleInput}
			{textArea}
			<div className="text-end">
				<Button type="submit" className="p-4 bg-slate-300 hover:bg-slate-400">
					{isEditing && !id ? `게시하기` : `완료`}
				</Button>
			</div>
		</form>
	);
}

export default WikiForm;
