import { makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound404 } from "./components/Common/NotFound404";
import { Login } from "./modules/auth/login/Login";
import { Register } from "./modules/auth/register/Register";
import { Dashboard } from "./modules/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100%",
	}
}));

function App() {
	const classes = useStyles();
	return (
		<Router>
			<div className={classes.root}>
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
