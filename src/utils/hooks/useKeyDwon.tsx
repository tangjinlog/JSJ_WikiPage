import { useEffect } from 'react';

interface UseKeyDownPropTypes {
	handleClose: () => void;
}

function useKeyDwon(handleClose: UseKeyDownPropTypes['handleClose']) {
	useEffect(() => {
		const keyDownEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};
		window.addEventListener('keydown', keyDownEsc);
		return () => window.addEventListener('keydown', keyDownEsc);
	}, []);
}

export default useKeyDwon;
