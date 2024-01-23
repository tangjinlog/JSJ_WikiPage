import { WikiListItemFetcher } from '@organisms/Fetcher';
import { WikiListContainer } from '@organisms/Container';
import { ApiErrorBoundary } from '@templates/ErrorBoundary';

export interface WikiContainerPropTypes {
	isFetching: boolean;
	setPage: (pageNumber: number) => React.Dispatch<React.SetStateAction<number>>;
}

function Wiki() {
	return (
		<ApiErrorBoundary>
			<WikiListItemFetcher>
				{(props: WikiContainerPropTypes) => <WikiListContainer {...props} />}
			</WikiListItemFetcher>
		</ApiErrorBoundary>
	);
}

export default Wiki;
