import { DataFeed, FeedElement } from "@solvedcard/ui";
import React, { useEffect, useState } from "react";
import { useGetActivitiesQuery } from "../../generated/graphql";

interface ActivitiesProps {}

export default function Activities(props: ActivitiesProps) {
	const { data, loading } = useGetActivitiesQuery({
		variables: {
			limit: 10,
		},
		fetchPolicy: "network-only",
	});

	const [dataList, setdataList] = useState<FeedElement[]>([
		{
			id: "0",
			content: "",
			heading: "",
		},
	]);

	useEffect(() => {
		if (data?.getActivites) {
			setdataList([
				...data.getActivites.activities.map((activity) => {
					return {
						id: activity.id,
						heading: activity.user.username,
						subHeading: activity.user.email,
						timeStamp: activity.created,
						content: `${activity.message}`,
						img_src:
							"https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
						img_type: "medium",
						actions: [
							{
								action: (key: number, event?: any) => {
									console.log("1", key);
								},
								title: "Test Action 1",
								svg: (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-4 h-4" // Required!
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								),
							},
							{
								action: (key: number, event?: any) => {
									console.log("2", key);
								},
								title: "Test Action 2",
								svg: (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-4 h-4" // Required!
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								),
							},
						],
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
					size="lg"
					type="message"
				/>
			</div>
		</React.Fragment>
	);
}
