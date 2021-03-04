import {
	DataTable,
	ElementAction,
	LabelKeyValue,
	SearchFields,
} from "@solvedcard/ui";
import React, { useEffect, useState } from "react";
import ModalPanel from "../../components/ModalPanel/ModelPanel";
import { useGetUsersQuery } from "../../generated/graphql";

interface UsersProps {}

export default function Users(props: UsersProps) {
	const [modalToggle, setmodalToggle] = useState(false);
	const [search, setSearch] = useState<SearchFields>({
		search: "",
		searchBy: "name",
		limit: 10,
		offset: 0,
	});

	const [labelState, setLabelState] = useState<LabelKeyValue[]>([
		{
			key: "username",
			value: "Username",
			selected: true,
		},
		{
			key: "email",
			value: "Email",
			selected: true,
		},
		{
			key: "firstName",
			value: "First Name",
			selected: true,
		},
		{
			key: "lastName",
			value: "Last Name",
			selected: true,
		},
		{
			key: "id",
			value: "ID",
			selected: false,
		},
	]);
	const [searchFields, setSearchFields] = useState<LabelKeyValue[]>([
		{
			key: "username",
			value: "User Name",
			selected: true,
		},
		{
			key: "name",
			value: "Name",
			selected: false,
		},
		{
			key: "email",
			value: "Email",
			selected: false,
		},
		{
			key: "all",
			value: "All",
			selected: false,
		},
	]);
	const eleActions: ElementAction[] = [
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
			action: (key?: number, event?: any) => {
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
	];

	const { data, loading } = useGetUsersQuery({
		variables: {
			[search.searchBy]: search.search,
			limit: search.limit,
			offset: search.offset,
		},
		fetchPolicy: "cache-and-network",
	});

	const [dataList, setdataList] = useState<any>([]);

	useEffect(() => {
		if (data?.getUsers) {
			setdataList([
				...data!.getUsers.users.map((user) => {
					return {
						...user,
						selected: false,
					};
				}),
			]);
		}
	}, [data]);

	const totalCount = data?.getUsers.count;

	return (
		<React.Fragment>
			<div className="container mx-auto px-4">
				<h1 className="text-3xl py-4 mb-1">Users</h1>

				<DataTable
					{...{
						eleActions,
						loading,
						totalCount,
						setSearch,
						search,
						dataList,
						setdataList,
						labelState,
						setLabelState,
						searchFields,
						setSearchFields,
					}}
					globalActions={
						<div className="ml-2">
							<button
								className="shadow rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4 text-sm"
								onClick={() => setmodalToggle(!modalToggle)}
							>
								<span className="hidden md:block">Add</span>
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
										d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
									/>
								</svg>
							</button>
						</div>
					}
				/>
			</div>

			{modalToggle ? (
				<ModalPanel
					title="Add New User"
					closeAction={setmodalToggle}
					size="medium"
					titleSVG={
						<svg
							className="w-8 h-8"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					}
				>
					<div>test content</div>
				</ModalPanel>
			) : null}
		</React.Fragment>
	);
}
