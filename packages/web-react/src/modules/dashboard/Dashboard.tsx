import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useMeQuery } from "../../generated/graphql";

interface DashboardProps {}


export const Dashboard = (props: DashboardProps) => {
	const {data} = useMeQuery();

	console.log(data);
	return (
		<>
			<Navbar>
				<div>test</div>
			</Navbar>
		</>
	);
};
