import { useRecoilValue } from 'recoil';
import { wikiTabSelectedState } from '@context/atom';
import { useRouter } from 'next/router';
import Wiki from '@organisms/Wiki';
import TabMenu from '@molecules/TabMenu';
import { twMerge } from 'tailwind-merge';

function Sidebar() {
	const isSelected = useRecoilValue(wikiTabSelectedState);
	const router = useRouter();
	const { tab } = router.query;
	return (
		<div
			className={twMerge(
				`md:relative md:right-0 sm:absolute sm:bottom-0 md:w-20`,
				`${isSelected ? `sm:h-[100vh] sm:w-[100vw] md:w-[520px] md:h-[100vh]` : `sm:h-16 sm:w-[100vw] md:w-20 md:h-[100vh]`}`,
				`transition-all overflow-hidden`,
			)}
		>
			<TabMenu />
			{tab === 'wiki' ? <Wiki /> : null}
		</div>
	);
}

export default Sidebar;
