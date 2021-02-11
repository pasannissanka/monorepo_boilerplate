import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
	// component: any;
}

export default function PrivateRoute(props: PrivateRouteProps) {
	const { children, ...rest } = props;
	// const isAuthenticated = useAuth(); // TODO State management
	const isAuthenticated = Boolean(localStorage.getItem("auth_token"));

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? children : <Redirect to="/login" />
			}
		/>
	);
}
