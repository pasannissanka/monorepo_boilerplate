import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Cookies from 'js-cookie'

interface PrivateRouteProps extends RouteProps {
	// component: any;
}

export default function PrivateRoute(props: PrivateRouteProps) {
	const { children, ...rest } = props;
	// TODO State management
	const isAuthenticated = Boolean(Cookies.get('access_token'));

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? children : <Redirect to="/login" />
			}
		/>
	);
}
