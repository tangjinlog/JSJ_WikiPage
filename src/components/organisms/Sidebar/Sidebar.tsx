import { useRecoilState } from 'recoil';
import { wikiTabSelectedState } from 'context/atom';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Wiki from '@organisms/Wiki';
import TabMenu from '@molecules/TabMenu';

function Sidebar() {
	const router = useRouter();
	const { tab } = router.query;

	console.log(tab);
	return (
		<div className={`relative w-[520px]  border-red`}>
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
