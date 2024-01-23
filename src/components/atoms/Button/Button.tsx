interface ButtonPropTypes
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	primary?: boolean;
	size?: 'big' | 'mid';
}

const sizes = { big: `w-40 h-20`, mid: `w-24 h-12` };

const buttonStyle = {
	primary: [`p-1 text-white bg-[#5295FF]`],
};

function Button({ children, ...props }: ButtonPropTypes) {
	return (
		<button
			{...props}
			type="button"
			className={`flex-center border-none rounded-lg cursor-pointer
				${props.className}
        ${props.primary ? buttonStyle.primary : ''}
        ${props.size ? sizes[props.size] : ''}
      `}
		>
			{children}
		</button>
	);
}

export default Button;
