import Button from '@atoms/Button';

interface PropTypes {
	onClickRetry: () => void;
}

export function AuthError() {
	return (
		<section className="flex-center absolute w-full h-full">
			<div className="flex-column gap-5 justify-center whitespace-pre-wrap text-center">
				<h1>로그인이 필요한 페이지입니다.</h1>
				<div className="flex-center gap-5">
					<Button
						className="w-[140px] p-1 hover:text-white hover:bg-black"
						onClick={() => (window.location.href = '/')}
					>
						메인으로 가기
					</Button>
					<Button
						onClick={() => {
							console.log('로그인 미구현');
						}}
					>
						로그인 하기
					</Button>
				</div>
			</div>
		</section>
	);
}

export function UnknownError({ onClickRetry }: PropTypes) {
	return (
		<section className="flex-center absolute w-full h-full">
			<div className="flex-column gap-5 justify-center whitespace-pre-wrap text-center">
				<h1 className="text-2xl">서비스 에러가 발생 하였습니다.</h1>
				<p>{`죄송합니다.\n기술적인 문제로인해\n일시적으로 서비스를 사용할 수 없습니다\n관리자에게 요청하여 빠른 시간 안에 해결 하겠습니다.`}</p>
				<div className="flex-center gap-5">
					<Button
						className="w-[140px] p-2 bg-black text-white hover:text-white hover:bg-black"
						onClick={() => (window.location.href = '/')}
					>
						메인으로 가기
					</Button>
					<Button
						className="w-[140px] p-2 hover:text-white hover:bg-black"
						onClick={onClickRetry}
					>
						다시 시도
					</Button>
				</div>
			</div>
		</section>
	);
}
