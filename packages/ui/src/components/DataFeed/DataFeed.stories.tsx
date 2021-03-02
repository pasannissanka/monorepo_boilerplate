import * as React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { DataFeed, DataFeedProps } from "./index";

export default {
	title: "DataFeed",
	component: DataFeed,
} as Meta;

const Template: Story<DataFeedProps> = (args) => <DataFeed {...args} />;

export const DataTableDefault = Template.bind({});
DataTableDefault.args = {
	/**
	 * Represents data from api and added additional fields ( selected: false (!required))
	 */
	dataList: [
		{
			content: "New Post Created",
			heading: "testrr",
			id: "f482c514-7e68-4910-b7b5-630f5a6090a0",
			subHeading: "test5@email.com",
			timeStamp: "2021-02-28T11:47:22.908Z",
		},
		{
			content: "New Post Created",
			heading: "testrr",
			id: "f482c514-7e68-4910-b7b5-630f5a6090a0",
			subHeading: "test5@email.com",
			timeStamp: "2021-02-28T11:47:22.908Z",
		},
		{
			content: "New Post Created",
			heading: "testrr",
			id: "f482c514-7e68-4910-b7b5-630f5a6090a0",
			subHeading: "test5@email.com",
			timeStamp: "2021-02-28T11:47:22.908Z",
		},
		{
			content: "New Post Created",
			heading: "testrr",
			id: "f482c514-7e68-4910-b7b5-630f5a6090a0",
			subHeading: "test5@email.com",
			timeStamp: "2021-02-28T11:47:22.908Z",
		},
	],
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
