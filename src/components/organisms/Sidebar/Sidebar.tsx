import { useRecoilState } from 'recoil';
import { wikiSelectedState } from 'context/atom';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Wiki from '@organisms/Wiki';
import TabMenu from '@molecules/TabMenu';

function Sidebar() {
	const [isSelected, setIsSelected] = useState(false);
	// const [isSelected, setIsSelected] = useRecoilState(wikiSelectedState);

	const router = useRouter();
	const { id, tab } = router.query;

	const clickHandler = useCallback(() => {
		isSelected ? setIsSelected(false) : setIsSelected(true);
	}, [isSelected]);

	console.log(tab);
	return (
		<div className={`relative ${isSelected ? `w-[520px]` : `w-20`} border-red`}>
			<TabMenu id={id} clickHandler={clickHandler} />
			{tab === 'wiki' ? <Wiki /> : null}
		</div>
	);
}

export default Sidebar;
