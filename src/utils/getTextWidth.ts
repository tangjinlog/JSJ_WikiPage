export function getTextWidth(text: string) {
	const span = document.createElement('span');
	span.textContent = text;
	span.style.visibility = 'hidden';
	span.style.whiteSpace = 'pre-wrap';

	document.body.appendChild(span);
	const width = span.getBoundingClientRect().width;
	document.body.removeChild(span);

	return Math.floor(width);
}
