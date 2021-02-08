import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./modules/auth/login/Login";
import { Register } from "./modules/auth/register/Register";

const useStyles = makeStyles((theme) => ({
	root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
	main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

function App() {
	const classes = useStyles();
	return (
		<Router>
			<div className={classes.root}>
				<Navbar />
				<Container maxWidth="md" className={classes.main}>
					<Switch>
						<Route exact path="/about">
							<div>test 1</div>
						</Route>
						<Route exact path="/users">
							<div>Users</div>
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/">
							<div>test</div>
						</Route>
						<Route path="*">
							<div>404 not found</div>
						</Route>
					</Switch>
				</Container>
			</div>
		</Router>
	);
}

export default App;
