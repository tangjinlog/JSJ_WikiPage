import LinkButton from '@atoms/LinkButton';

type TabMenuPropTypes = {
	id: string | string[] | undefined;
	clickHandler: () => void;
};

function TabMenu({ id, clickHandler }: TabMenuPropTypes) {
	const menuItems = [{ wiki: `위키` }];

	return (
		<div className="absolute right-0 w-20">
			{menuItems.map((item, idx) => {
				const [key, value] = Object.entries(item)[idx];
				return (
					<div key={key} className="w-full bg-white">
						<LinkButton href={`${id}?tab=${key}`} onClick={clickHandler}>
							{value}
						</LinkButton>
					</div>
				);
			})}
		</div>
	);
}

export default TabMenu;
