import React, { JSXElementConstructor, useState } from 'react';

interface useInputPropTypes
	extends React.InputHTMLAttributes<HTMLInputElement> {
	initValue?: any;
}

export interface UseInputResponse {
	value: string;
	input: React.ReactElement;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

function useInput({ initValue, ...props }: useInputPropTypes) {
	const [value, setValue] = useState(initValue || '');
	let input;
	input = (
		<input
			type="text"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			{...props}
		/>
	);
	return [value, input, setValue];
}
export const useTextInput = (options: Parameters<typeof useInput>[0]) =>
	useInput({ type: 'text', ...options });
