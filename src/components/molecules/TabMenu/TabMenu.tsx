import LinkButton from '@atoms/LinkButton';
import { wikiTabSelectedState } from 'context/atom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

function TabMenu() {
	const [isSelected, setIsSelected] = useRecoilState(wikiTabSelectedState);
	const router = useRouter();

	const clickHandler = useCallback(() => {
		if (isSelected) {
			setIsSelected(false);
			router.back();
		} else {
			setIsSelected(true);
		}
	}, [isSelected]);

	const menuItems = [{ wiki: `위키` }];

	return (
		<div className="absolute right-0 w-20">
			{menuItems.map((item, idx) => {
				const [key, value] = Object.entries(item)[idx];
				return (
					<div key={key} className="w-full bg-white">
						<LinkButton href={`?tab=${key}`} onClick={clickHandler}>
							{value}
						</LinkButton>
					</div>
				);
			})}
		</div>
	);
}

export default TabMenu;
