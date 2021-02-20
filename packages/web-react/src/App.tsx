import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound404 } from "./components/Common/NotFound404";
import { useMeQuery } from "./generated/graphql";
import { Login } from "./modules/auth/login/Login";
import { Register } from "./modules/auth/register/Register";
import { Dashboard } from "./modules/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
	useMeQuery();

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
					<Dashboard />
				</PrivateRoute>
				<Route path="*">
					<NotFound404 />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
