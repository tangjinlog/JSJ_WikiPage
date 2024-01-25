import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { normalizeOptions } from '@utils/normalizeOptions';

type ControlOptions = {
	/**
	 * 새로고침 방지 유무
	 *
	 * @defaultValue `true`
	 */
	reload?: boolean | undefined;
	/**
	 * 커스텀 RouteBlocking 조건
	 *
	 * @defaultValue `true`
	 */
	condition?: boolean | undefined;
	/**
	 * 이벤트 동작을 제외시킬 nextUrl
	 *
	 * 해당 url은 뒤로가기 시에도 모달 감지 x
	 *
	 * @defaultValue ['default']
	 */
	exceptUrl?: string[] | undefined;
	/**
	 * queryString의 변화도 감지할 것인지 유무
	 *
	 * @defaultValue false
	 */
	detectQuery?: boolean | undefined;
};

const defaultControlOptions: ControlOptions = {
	reload: true,
	condition: true,
	exceptUrl: ['default'],
	detectQuery: false,
};

/**
 * @param {Function} blockingCallback Routing을 막는 Callback함수
 * @returns {Function} unBlockingWithCallback(Callback:optional)
 */
function useRouteControl(
	blockingCallback: () => void,
	options: ControlOptions = defaultControlOptions,
) {
	const [nextUrl, setNextUrl] = useState<string>('');
	const router = useRouter();

	normalizeOptions(options, defaultControlOptions);

	useEffect(() => {
		const preventReload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
		};
		//TODO: 현재 사용자가 exceptUrl에 full path를 입력해야 함
		if (
			options.reload &&
			options.condition &&
			!options.exceptUrl?.includes(nextUrl)
		) {
			window.addEventListener('beforeunload', preventReload);
		}
		return () => {
			window.removeEventListener('beforeunload', preventReload);
		};
	}, [options.reload, options.condition, options.exceptUrl, nextUrl]);

	const isSamePath = useCallback(
		(nextUrl: string) => {
			return options.detectQuery
				? router.asPath === nextUrl
				: router.asPath.split('?')[0] === nextUrl.split('?')[0];
		},
		[router.asPath, options.detectQuery],
	);

	const syncUrlWithRouter = useCallback(
		(nextUrl: string) => {
			if (nextUrl !== '/') {
				window.history.pushState(null, '', router.asPath);
				router.replace(router.asPath);
			}
		},
		[router.asPath, nextUrl],
	);

	const handleRouteChange = useCallback(
		(nextUrl: string) => {
			if (isSamePath(nextUrl)) {
				return;
			}
			syncUrlWithRouter(nextUrl);
			setNextUrl(nextUrl);
			blockingCallback();
			router.events.emit('routeChangeError');
			throw 'Next Route is Blocking';
		},
		[
			router.asPath,
			nextUrl,
			options.detectQuery,
			syncUrlWithRouter,
			isSamePath,
			blockingCallback,
		],
	);

	const unBlockingWithCallback = useCallback(
		(callback?: () => void) => {
			router.events.off('routeChangeStart', handleRouteChange);
			router.replace(nextUrl);
			callback?.();
		},
		[router.events, nextUrl, handleRouteChange],
	);

	useEffect(() => {
		if (options.condition && options.exceptUrl) {
			if (
				options.exceptUrl[0] === 'default' ||
				(options.exceptUrl[0] !== 'default' &&
					!options.exceptUrl.includes(nextUrl))
			) {
				router.events.on('routeChangeStart', handleRouteChange);
			}
		}

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [
		router.events,
		handleRouteChange,
		nextUrl,
		options.condition,
		options.exceptUrl,
	]);

	return { unBlockingWithCallback };
}

export default useRouteControl;
