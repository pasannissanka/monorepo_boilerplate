import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound404 } from "./components/Common/NotFound404";
import { useMeQuery } from "./generated/graphql";
import { Login } from "./modules/auth/login/Login";
import { Register } from "./modules/auth/register/Register";
import { HomePage } from "./modules/dashboard/HomePage";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import Cookies from "js-cookie";

function App() {
	const isAuthenticated = Boolean(Cookies.get("refresh_token"));
	useMeQuery({
		skip: !isAuthenticated,
	});

	return (
		<Router>
			<Switch>
				<PublicRoute exact path="/login">
					<Login />
				</PublicRoute>
				<PublicRoute exact path="/register">
					<Register />
				</PublicRoute>
				<PrivateRoute path="/">
					<HomePage />
				</PrivateRoute>
				<Route path="*">
					<NotFound404 />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
