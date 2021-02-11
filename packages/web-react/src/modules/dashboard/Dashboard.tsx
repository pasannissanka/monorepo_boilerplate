import { makeStyles } from "@material-ui/core";
import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";

interface DashboardProps {}

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100%",
	},
	main: {
		marginTop: theme.spacing(8),
	},
}));

export const Dashboard = (props: DashboardProps) => {
	// const classes = useStyles();
	return (
		<>
			<Navbar>
				<div>
          test
        </div>
			</Navbar>
		</>
	);
};
