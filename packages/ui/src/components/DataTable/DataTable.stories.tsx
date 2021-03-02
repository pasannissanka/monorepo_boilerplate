import * as React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { DataTable } from "./DataTable";
import { DataTableProps } from "./types";

export default {
	title: "DataTable",
	component: DataTable,
} as Meta;

const Template: Story<DataTableProps> = (args) => <DataTable {...args} />;

export const DataTableDefault = Template.bind({});
DataTableDefault.args = {
	/**
	 * Represents data from api and added additional fields ( selected: false (!required))
	 */
	dataList: [
		{
			content:
				"Many-to-one / one-to-many is a relation where A contains multiple instances of B, but B contains only one instance of A. Let's take for example User and Photo entities. User can have multiple photos, but each photo is owned by only one single user.",
			created: "2021-02-28T11:47:22.908Z",
			id: 1,
			selected: false,
			title: "TypeORM",
			updated: "2021-02-28T11:47:22.908Z",
			__typename: "Post",
		},
		{
			content:
				"Many-to-one / one-to-many is a relation where A contains multiple instances of B, but B contains only one instance of A. Let's take for example User and Photo entities. User can have multiple photos, but each photo is owned by only one single user.",
			created: "2021-02-28T11:47:22.908Z",
			id: 1,
			selected: false,
			title: "TypeORM",
			updated: "2021-02-28T11:47:22.908Z",
			__typename: "Post",
		},
		{
			content:
				"Many-to-one / one-to-many is a relation where A contains multiple instances of B, but B contains only one instance of A. Let's take for example User and Photo entities. User can have multiple photos, but each photo is owned by only one single user.",
			created: "2021-02-28T11:47:22.908Z",
			id: 1,
			selected: false,
			title: "TypeORM",
			updated: "2021-02-28T11:47:22.908Z",
			__typename: "Post",
		},
		{
			content:
				"Many-to-one / one-to-many is a relation where A contains multiple instances of B, but B contains only one instance of A. Let's take for example User and Photo entities. User can have multiple photos, but each photo is owned by only one single user.",
			created: "2021-02-28T11:47:22.908Z",
			id: 1,
			selected: false,
			title: "TypeORM",
			updated: "2021-02-28T11:47:22.908Z",
			__typename: "Post",
		},
		{
			content:
				"Many-to-one / one-to-many is a relation where A contains multiple instances of B, but B contains only one instance of A. Let's take for example User and Photo entities. User can have multiple photos, but each photo is owned by only one single user.",
			created: "2021-02-28T11:47:22.908Z",
			id: 1,
			selected: false,
			title: "TypeORM",
			updated: "2021-02-28T11:47:22.908Z",
			__typename: "Post",
		},
	],
	labelState: [
		{
			key: "title",
			value: "Tile",
			selected: true,
		},
		{
			key: "content",
			value: "Content",
			selected: true,
		},
		{
			key: "id",
			value: "ID",
			selected: false,
		},
	],
	searchFields: [
		{
			key: "title",
			value: "Title",
			selected: true,
		},
		{
			key: "all",
			value: "All",
			selected: false,
		},
	],
	eleActions: [
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
	globalActions: (
		<div className="ml-2">
			<button
				className="shadow rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4 text-sm"
				onClick={() => {}}
			>
				<span className="hidden md:block">New</span>
				<svg
					className="w-5 h-5 ml-1"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
			</button>
		</div>
	),
};

export const DataTableNoData = Template.bind({});
DataTableNoData.args = {
	dataList: [],
	labelState: [
		{
			key: "title",
			value: "Tile",
			selected: true,
		},
		{
			key: "content",
			value: "Content",
			selected: true,
		},
		{
			key: "id",
			value: "ID",
			selected: false,
		},
	],
	searchFields: [
		{
			key: "title",
			value: "Title",
			selected: true,
		},
		{
			key: "all",
			value: "All",
			selected: false,
		},
	],
	eleActions: [
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
	],
	loading: false,
	search: {
		limit: 0,
		offset: 0,
		search: "",
		searchBy: "",
	},
	totalCount: 0,
	setLabelState: () => {},
	setSearch: () => {},
	setSearchFields: () => {},
	setdataList: () => {},
};

export const DataTableLoading = Template.bind({});
DataTableLoading.args = {
	dataList: [],
	labelState: [
		{
			key: "title",
			value: "Tile",
			selected: true,
		},
		{
			key: "content",
			value: "Content",
			selected: true,
		},
		{
			key: "id",
			value: "ID",
			selected: false,
		},
	],
	searchFields: [
		{
			key: "title",
			value: "Title",
			selected: true,
		},
		{
			key: "all",
			value: "All",
			selected: false,
		},
	],
	eleActions: [
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
	],
	loading: true,
	search: {
		limit: 0,
		offset: 0,
		search: "",
		searchBy: "",
	},
	totalCount: 0,
	setLabelState: () => {},
	setSearch: () => {},
	setSearchFields: () => {},
	setdataList: () => {},
};
