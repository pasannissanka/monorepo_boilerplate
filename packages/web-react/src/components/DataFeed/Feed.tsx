import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as timeago from "timeago.js";
import { useDataTableContext } from "../DataTable/Context/DataTableContext";
import { ElementAction } from "../DataTable/DataTable";

export interface KeyValueObject {
	key: string;
	value: string;
}

export interface FeedElement {
	id: string;
	heading: string;
	subHeading?: string;
	timeStamp?: string;
	img_src?: string;
	img_type?: "avatar" | "small" | "medium";
	content: string | KeyValueObject[];
	actions?: ElementAction[];
}

interface FeedProps {}

export default function Feed(props: FeedProps) {
	const ctx = useDataTableContext();
	const dataList = ctx.dataList as FeedElement[];

	const [expandedState, setExpandedState] = useState<any[]>([]);

	useEffect(() => {
		if (dataList.length > 0) {
			setExpandedState([
				...dataList.map((_) => {
					return {
						expanded: false,
					};
				}),
			]);
		}
	}, [dataList]);

	const handleExpand = (index: number) => {
		setExpandedState([
			...expandedState.slice(0, index),
			{
				expanded: !expandedState[index].expanded,
			},
			...expandedState.slice(index + 1),
		]);
	};

	return (
		<React.Fragment>
			{dataList.map((element, index) => (
				<div
					key={element.id}
					className="flex bg-white shadow rounded-lg md:mx-auto max-w-md md:max-w-3xl mt-3"
				>
					<div className="flex items-start px-4 py-3 w-full">
						<img
							className="w-8 h-8 rounded-full object-cover mr-4 shadow"
							src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
							alt="avatar"
						/>
						<div className="w-full">
							<div className="flex items-center justify-between">
								<span className="flex">
									<h2 className="text-lg font-semibold text-gray-900 -mt-1">
										{element.heading}
									</h2>
									<h4 className="text-sm font-medium text-gray-400 ml-1">
										{element?.subHeading}
									</h4>
								</span>
								{element.timeStamp ? (
									<small className="text-sm text-gray-700">
										{timeago.format(element.timeStamp)}
									</small>
								) : null}
							</div>
							{typeof element.content === "string" ? (
								<div className="flex items-center justify-between">
									<p className="mt-2 text-gray-700 text-sm">
										{element.content}
									</p>
								</div>
							) : (
								<div
									className="flex items-center justify-end cursor-pointer"
									onClick={() => handleExpand(index)}
								>
									<button className="pt-2 focus:outline-none focus:shadow-outline">
										{expandedState[index]?.expanded ? (
											<svg
												className="h-4 w-4"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 15l7-7 7 7"
												/>
											</svg>
										) : (
											<svg
												className="h-4 w-4"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										)}
									</button>
								</div>
							)}
							{/* Expansion content */}
							{typeof element.content === "object" ? (
								<div
									className={`text-gray-700 ${
										!expandedState[index]?.expanded ? "hidden" : ""
									}`}
								>
									test
								</div>
							) : null}
						</div>
					</div>
				</div>
			))}
		</React.Fragment>
	);
}
