import React from "react";
import QuickActionCard from "../../components/QuickAction/QuickActionCard";

interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
	return (
		<React.Fragment>
			<div className="flex flex-wrap items-center justify-start ">
				<QuickActionCard heading="Users" subHeading="All" count={50} />
				<QuickActionCard heading="Users" subHeading="All" count={50} />
				<QuickActionCard heading="Users" subHeading="All" count={50} />
			</div>
		</React.Fragment>
	);
}
