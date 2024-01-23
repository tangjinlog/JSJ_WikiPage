import { WikiListItemFetcher } from '@organisms/Fetcher';
import { WikiListContainer } from '@organisms/Container';

export interface WikiContainerPropTypes {
	isFetching: boolean;
	setPage: (pageNumber: number) => React.Dispatch<React.SetStateAction<number>>;
}

function Wiki() {
	return (
		<>
			<WikiListItemFetcher>
				{(props: WikiContainerPropTypes) => <WikiListContainer {...props} />}
			</WikiListItemFetcher>
		</>
	);
}

export default Wiki;
