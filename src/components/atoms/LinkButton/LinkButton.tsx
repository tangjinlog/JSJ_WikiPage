import Link from 'next/link';

interface PropTypes extends React.LinkHTMLAttributes<HTMLAnchorElement> {
	children: React.ReactNode;
	href: string;
	replace?: boolean;
}

function LinkButton({ href, children, ...props }: PropTypes) {
	return (
		<Link href={href} {...props}>
			{children}
		</Link>
	);
}

export default LinkButton;
