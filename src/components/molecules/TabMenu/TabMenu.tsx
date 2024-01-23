import LinkButton from '@atoms/LinkButton';
import { wikiTabSelectedState } from '@context/atom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Image from 'next/image';
import WikiLogo from '@images/wiki.png';

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
		<div
			className={`absolute md:h-[100vh] md:w-20 md:right-0 sm:bottom-0 sm:w-[100vw] sm:h-14 z-10 bg-white`}
		>
			{menuItems.map((item, idx) => {
				const [key, value] = Object.entries(item)[idx];
				return (
					<LinkButton
						key={key}
						href={`?tab=${key}`}
						className={`absolute flex-center flex-col w-full h-full hover:bg-primary-blue hover:text-white`}
						onClick={clickHandler}
					>
						<Image src={WikiLogo} width={30} height={30} alt="Wiki Tab Logo" />
						{value}
					</LinkButton>
				);
			})}
		</div>
	);
}

export default TabMenu;
