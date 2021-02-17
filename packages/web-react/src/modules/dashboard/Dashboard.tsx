import React from "react";
import Drawer from "../../components/Drawer/Drawer";
import Footer from "../../components/Footer/Footer";
import AppBar from "../../components/Navbar/AppBar";
import { useMeQuery } from "../../generated/graphql";

interface DashboardProps {}

export const Dashboard = (props: DashboardProps) => {
	const { data } = useMeQuery();

	console.log(data);
	return (
		<>
			<div className="flex h-screen overflow-y-hidden bg-white">
				<Drawer />
				<div className="flex flex-col flex-1 h-full overflow-hidden">
					<AppBar />
					<main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll"></main>
					<Footer />
				</div>
			</div>
		</>
	);
};
