import React, { useEffect, useState } from "react";
import DataFeed from "../../components/DataFeed/DataFeed";
import { useGetActivitiesQuery } from "../../generated/graphql";

interface ActivitiesProps {}

export default function Activities(props: ActivitiesProps) {
	const { data, loading } = useGetActivitiesQuery({
		variables: {
			limit: 10,
		},
	});

	const [dataList, setdataList] = useState<any>([]);

	useEffect(() => {
		if (data?.getActivites) {
			setdataList([
				...data.getActivites.activities.map((activity) => {
					return {
						...activity,
						selected: false,
					};
				}),
			]);
		}
	}, [data]);

	const totalCount = data?.getActivites.count;

	return (
		<React.Fragment>
			<div className="container mx-auto px-4">
				<h1 className="text-3xl py-4 mb-1">Recent Activities</h1>

				{/* 
					TODO : Filter bar,
					activity links
				*/}

				<DataFeed
					{...{
						loading,
						totalCount,
						dataList,
					}}
				/>
			</div>
		</React.Fragment>
	);
}
