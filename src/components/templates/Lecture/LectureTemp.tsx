import React, { useCallback, useState } from 'react';
import Sidebar from '@organisms/Sidebar';

function LectureTemp() {
	const [isClick, setIsClick] = useState(false);

	return (
		<section className="full-screen flex">
			<div className="flex-1 bg-gray-50">player</div>
			<Sidebar />
		</section>
	);
}

export default LectureTemp;
