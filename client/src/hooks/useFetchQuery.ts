import {
	QueryFunction,
	QueryKey,
	UseQueryOptions,
	useQuery,
} from "react-query";

export const useFetchQuery = <Data>(
	key: QueryKey,
	fetcher: QueryFunction<Data>,
	options?: UseQueryOptions<Data, unknown, any, QueryKey>
) => {
	const {
		data,
		isError,
		isFetching: isLoading,
	} = useQuery<Data>(key, fetcher, {
		...options,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	return {
		data,
		isError,
		isLoading,
	};
};