import React, { useCallback, useState } from 'react';
import Sidebar from '@organisms/Sidebar';

function LectureTemp() {
	const [isClick, setIsClick] = useState(false);

	return (
		<section className="full-screen flex">
			<div className="flex-center flex-1 p-6 bg-gray-50">
				<div>Loading...</div>
			</div>
			<Sidebar />
		</section>
	);
}

export default LectureTemp;
