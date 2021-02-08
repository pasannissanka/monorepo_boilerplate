import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";

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

const httpLink = new HttpLink({
	uri: "http://localhost:4001/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
	// Retrieve the authorization token from local storage.
	const token = localStorage.getItem("auth_token");

	// Use the setContext method to set the HTTP headers.
	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	});

	// Call the next link in the middleware chain.
	return forward(operation);
});

const link = ApolloLink.from([errorlink, authLink.concat(httpLink)]);

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	credentials: "include",
	connectToDevTools: true,
	link: link,
	ssrMode: false
});
