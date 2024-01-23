import React from 'react';

const content = {
	wiki: `목록을\n불러오고 있습니다.`,
	other: `로딩중입니다...`,
};

interface LoadingProps {
	type: 'wiki' | 'other';
}

function Loading({ type }: LoadingProps) {
	return (
		<div className="flex-center">
			<p>{content[type]}</p>
		</div>
	);
}

export default Loading;
