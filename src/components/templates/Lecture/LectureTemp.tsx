import Sidebar from '@organisms/Sidebar';

function LectureTemp() {
	return (
		<section className="full-screen flex">
			<div className="flex-center flex-1 p-6 bg-gray-50">
				<div className="relative flex-center w-full h-full sm:h-[calc(100vh-104px)] sm:mb-[56px] rounded-xl bg-gray-200">
					<a
						href="/"
						className="absolute top-0 left-0 px-2 rounded-md bg-black/[0.2] text-white"
					>
						home button
					</a>
					Loading...
				</div>
			</div>
			<Sidebar />
		</section>
	);
}

export default LectureTemp;
