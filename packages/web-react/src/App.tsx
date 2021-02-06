import React from "react";
import {
	Container,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import { Inbox, Mail } from "@material-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./modules/auth/login/Login";

function App() {
	const drawer = (
		<List>
			{["All test", "Trash", "Spam"].map((text, index) => (
				<ListItem button key={text}>
					<ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</List>
	);

	return (
		<Router>
			<div className="App">
				<Navbar drawerChildren={drawer} />
				<Container maxWidth="md" style={{ marginTop: 20 }}>
					<Switch>
						<Route path="/about">
							<Login />
						</Route>
						<Route path="/users">
							<Login />
						</Route>
						<Route path="/">
							<div>test</div>
						</Route>
					</Switch>
				</Container>
			</div>
		</Router>
	);
}

export default App;
