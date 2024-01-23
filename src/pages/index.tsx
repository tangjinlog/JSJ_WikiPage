import React from 'react';
import LinkButton from '@atoms/LinkButton';
import { IconLogo } from '../../public/svgs/index';

function index() {
	return (
		<section className="flex-center flex-col gap-5 full-screen px-5 text-xl bg-white">
			<div className="relative flex-center">
				<IconLogo className="absolute bottom-[150%] text-center w-40" />
				<LinkButton
					href={`/wiki`}
					className="flex-center p-5 text-xl font-extrabold border-solid border border-slate-200 rounded-2xl hover:bg-slate-200"
				>
					Chapter 1. 코딩허브 기업과제 이해
				</LinkButton>
			</div>
		</section>
	);
}

export default index;
