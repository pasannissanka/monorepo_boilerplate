import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorlink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) {
		console.log(`[Network error]: ${networkError}`);
	}
});

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: ApolloLink.from([
		errorlink,
		createHttpLink({
			uri: "http://localhost:4001/graphql",
			credentials: "include",
		})
	]),
	connectToDevTools: true,
	ssrMode: false,
});
