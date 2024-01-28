import { getTextWidth } from '@utils/getTextWidth';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface useInputPropTypes
	extends React.InputHTMLAttributes<HTMLInputElement> {
	initValue?: any;
}

interface useTextAreaPropTypes
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	initValue?: any;
}

interface useTextAreaWithAnnotationPropTypes
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	initValue?: any;
	trigger?: '#' | undefined;
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

export function useTextArea({ initValue, ...props }: useTextAreaPropTypes) {
	const [value, setValue] = useState(initValue || '');
	let textarea;
	textarea = (
		<textarea
			value={value}
			onChange={(e) => setValue(e.target.value)}
			{...props}
		/>
	);
	return [value, textarea, setValue];
}

export const useTextAreaWithAnnotation = ({
	initValue,
	trigger = '#',
	...props
}: useTextAreaWithAnnotationPropTypes) => {
	const [value, setValue] = useState(initValue || '');
	const [isDetected, setIsDetected] = useState(false);
	const [annotationPosition, setAnnotationPosition] = useState({
		top: 0,
		left: 0,
	});

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const target = e.target.value;
		setValue(target);
		const triggerIndex = target.indexOf(trigger);
		if (triggerIndex !== -1) {
			const cursorPosition = e.target.selectionStart;
			const textBeforeCursor = e.target.value.substring(0, cursorPosition);
			const lines = textBeforeCursor.split('\n');
			const lineHeight = parseInt(getComputedStyle(e.target).lineHeight, 10);
			const lineNumber = lines.length;

			const width = getTextWidth(lines[lineNumber - 1]);

			setAnnotationPosition({
				top: (lineNumber + 1) * lineHeight,
				left: width + 4,
			});

			setIsDetected(true);
		} else {
			setIsDetected(false);
		}
	};

	const annotationStyle = {
		position: 'absolute',
		zIndex: '998',
		top: annotationPosition.top + 'px',
		left: annotationPosition.left + 'px',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		padding: '16px',
		border: '1px solid #ccc',
		borderRadius: '5px',
		display: isDetected ? 'block' : 'none',
	} as const;

	let textarea;
	textarea = (
		<div style={{ position: 'relative' }}>
			{isDetected
				? createPortal(
						<div style={annotationStyle}>annotation</div>,
						document.getElementById('anno')!,
					)
				: null}
			<textarea value={value} onChange={handleChange} {...props} />
			<div id="anno"></div>
		</div>
	);

	return [value, textarea, setValue];
};
