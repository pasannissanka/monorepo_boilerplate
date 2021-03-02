import * as React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { DataFeed, DataFeedProps } from "./index";
import { FeedElement } from "./types";

export default {
	title: "DataFeed",
	component: DataFeed,
} as Meta;

const Template: Story<DataFeedProps> = (args) => <DataFeed {...args} />;

export const DataFeedMessage = Template.bind({});
DataFeedMessage.args = {
	/**
	 * Represents data from api and added additional fields ( selected: false (!required))
	 */
	dataList: [
		{
			content: "New Post Created",
			img_src:
				"https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
			img_type: "avatar",
			heading: "testrr",
			id: "f482c514-7e68-4910-b7b5-630f5a6090a0",
			subHeading: "test5@email.com",
			timeStamp: "2021-02-28T11:47:22.908Z",
		},
		{
			img_src:
				"https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
			img_type: "avatar",
			content: "New Post Created",
			heading: "testrr",
			id: "f482c514-7e68-4910-b7b5-630f5a6090a0",
			subHeading: "test5@email.com",
			timeStamp: "2021-02-28T11:47:22.908Z",
		},
	] as FeedElement[],
	loading: false,
	search: {
		limit: 0,
		offset: 0,
		search: "",
		searchBy: "",
	},
	setLabelState: () => {},
	setSearch: () => {},
	totalCount: 5,
	setSearchFields: () => {},
	setdataList: () => {},
};

export const DataFeedObject = Template.bind({});
DataFeedObject.args = {
	size: "lg",
	type: "message",
	dataList: [
		{
			heading: "testrr",
			id: "f482c514-7e68-4910-b7b5-630f5a6090a0",
			subHeading: "test5@email.com",
			timeStamp: "2021-02-28T11:47:22.908Z",
			img_src:
				"https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
			img_type: "medium",
			content:
				"And because monorepos should make our lifes easier, we’ll add scripts in our root-package.json to start storybook, and execute the library build before starting our CRA app: And because monorepos should make our lifes easier, we’ll add scripts in our root-package.json to start storybook, and execute the library build before starting our CRA app:",
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
		},
	] as FeedElement[],
	loading: false,
	search: {
		limit: 0,
		offset: 0,
		search: "",
		searchBy: "",
	},
	setLabelState: () => {},
	setSearch: () => {},
	totalCount: 5,
	setSearchFields: () => {},
	setdataList: () => {},
};

export const DataFeedLoading = Template.bind({});
DataFeedLoading.args = {
	size: "lg",
	type: "message",
	dataList: [{}],
	loading: true,
	search: {
		limit: 0,
		offset: 0,
		search: "",
		searchBy: "",
	},
	setLabelState: () => {},
	setSearch: () => {},
	totalCount: 5,
	setSearchFields: () => {},
	setdataList: () => {},
};
