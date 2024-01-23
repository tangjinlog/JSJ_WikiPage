import Sidebar from '@organisms/Sidebar';

function LectureTemp() {
	return (
		<section className="full-screen flex">
			<div className="flex-center flex-1 p-6 bg-gray-50">
				<div className="flex-center w-full h-full sm:h-[calc(100vh-104px)] sm:mb-[56px] rounded-xl bg-gray-200">
					Loading...
				</div>
			</div>
			<Sidebar />
		</section>
	);
}

export default LectureTemp;
