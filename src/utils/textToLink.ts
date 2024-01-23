export function textToLink(text: string) {
	let isDetect = false;
	const trigger = '#';

	if (text === trigger) isDetect = true;

	if (isDetect) {
		console.log('detect');
	}
}
