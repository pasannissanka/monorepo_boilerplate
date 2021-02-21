import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound404 } from "../../components/Common/NotFound404";
import Drawer from "../../components/Drawer/Drawer";
import Footer from "../../components/Footer/Footer";
import AppBar, { AppBarProps } from "../../components/Navbar/AppBar";
import Users from "../Users/Users";
import Dashboard from "./Dashboard";

export interface IDropDownState {
	profile: boolean;
	mobileSearchPanel: boolean;
}

interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
	const [isDrawerOpen, setDrawerOpenState] = useState(true);
	const [dropdownMenuState, setdropdownMenuState] = useState<IDropDownState>({
		profile: false,
		mobileSearchPanel: false,
	});

	const handelDrawer = () => {
		setDrawerOpenState(!isDrawerOpen);
	};
	const closeAllMenus = () => {
		setdropdownMenuState({
			...dropdownMenuState,
			profile: false,
		});
	};

	const appBarProps: AppBarProps = {
		dropdownMenuState,
		setdropdownMenuState,
		isDrawerOpen,
		handleDrawerOpen: handelDrawer,
	};

	return (
		<>
			<div className="flex h-screen overflow-y-hidden bg-gray-50">
				<Drawer isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
				<div className="flex flex-col flex-1 h-full overflow-hidden">
					<AppBar {...appBarProps} />
					<main
						className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll"
						onClick={closeAllMenus}
					>
						<Switch>
							<Route exact path="/">
								<Dashboard />
							</Route>
							<Route exact path="/users">
								<Users />
							</Route>
							<Route exact path="/profile">
								<NotFound404 />
							</Route>
							<Route path="*">
								<div>test</div>
							</Route>
						</Switch>
					</main>
					<Footer />
				</div>
			</div>
		</>
	);
};
