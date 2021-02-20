import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Cookies from 'js-cookie'

interface PublicRouteProps extends RouteProps {
	// component: any;
}

export default function PublicRoute(props: PublicRouteProps) {
	const { children, ...rest } = props;
	// TODO State management
	const isNotAuthenticated = !Boolean(Cookies.get('access_token'));

	return (
		<Route
			{...rest}
			render={(props) =>
				isNotAuthenticated ? children : <Redirect to="/" />
			}
		/>
	);
}
