import { WikiListItemFetcher } from '@organisms/Fetcher';
import { WikiListContainer } from '@organisms/Container';

export interface WikiContainerPropTypes {
	isFetching: boolean;
	setPage: React.Dispatch<React.SetStateAction<boolean>>;
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
