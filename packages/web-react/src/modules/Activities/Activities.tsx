import React, { useEffect, useState } from "react";
import DataFeed from "../../components/DataFeed/DataFeed";
import { FeedElement, KeyValueObject } from "../../components/DataFeed/Feed";
import { useGetActivitiesQuery } from "../../generated/graphql";

interface ActivitiesProps {}

export default function Activities(props: ActivitiesProps) {
	const { data, loading } = useGetActivitiesQuery({
		variables: {
			limit: 10,
		},
		fetchPolicy: "network-only",
	});

	const [dataList, setdataList] = useState<FeedElement[]>([]);

	useEffect(() => {
		if (data?.getActivites) {
			setdataList([
				...data.getActivites.activities.map((activity) => {
					return {
						id: activity.id,
						heading: activity.user.username,
						subHeading: activity.user.email,
						timeStamp: activity.created,
						content: `${activity.message} ${activity.action}`,
					} as FeedElement;
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
