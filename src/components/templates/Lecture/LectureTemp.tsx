import React, { useCallback, useState } from 'react';
import Sidebar from '@organisms/Sidebar';

function LectureTemp() {
	const [isClick, setIsClick] = useState(false);

	return (
		<section className="full-screen flex bg-red-200">
			<div className="flex-1 border-red ">player</div>
			<Sidebar />
		</section>
	);
}

export default LectureTemp;
