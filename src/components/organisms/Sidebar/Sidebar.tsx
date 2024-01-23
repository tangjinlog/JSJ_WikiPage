import { useRecoilState, useRecoilValue } from 'recoil';
import { wikiTabSelectedState } from '@context/atom';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Wiki from '@organisms/Wiki';
import TabMenu from '@molecules/TabMenu';
import { twMerge } from 'tailwind-merge';

function Sidebar() {
	const isSelected = useRecoilValue(wikiTabSelectedState);
	const router = useRouter();
	const { tab } = router.query;
	//${isSelected ? `max-md:h-[100vh] max-md:w-[100vw] min-md:w-[520px] min-md:h-full` : `max-md:h-16 max-md:w-[100vw] min-md:w-[100px] min-md:h-16`}
	console.log(tab);
	return (
		<div
			className={twMerge(
				`relative md:right-0 sm:absolute sm:bottom-0 w-20`,
				`${isSelected ? `sm:h-[100vh] sm:w-[100vw] md:w-[520px] md:h-[100vh]` : `sm:h-16 sm:w-[100vw] md:w-20 md:h-full`}`,
				`transition-all overflow-y-hidden`,
			)}
		>
			<TabMenu />
			{tab === 'wiki' ? <Wiki /> : null}
		</div>
	);
}

export default Sidebar;

//TODO:

//auto link
// motion styling
// wiki crud
// error boundary
