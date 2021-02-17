import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound404 } from "./components/Common/NotFound404";
import { Login } from "./modules/auth/login/Login";
import { Register } from "./modules/auth/register/Register";
import { Dashboard } from "./modules/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<PrivateRoute exact path="/">
						<Dashboard />
					</PrivateRoute>
					<Route path="*">
						<NotFound404 />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
