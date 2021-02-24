import React, { useEffect, useState } from "react";
import DataTable, { LabelKeyValue } from "../../components/DataTable/DataTable";
import SearchFilter from "../../components/DataTable/SearchFilter";
import ModalPanel from "../../components/ModalPanel/ModelPanel";
import { useGetUsersQuery } from "../../generated/graphql";
import { UsersContext } from "./UserContext";

interface UsersProps {}

export default function Users(props: UsersProps) {
	const [modalToggle, setmodalToggle] = useState(false);
	const [searchQuery, setSearchQuery] = useState({
		search: "",
		searchBy: "all",
	});

	const { data } = useGetUsersQuery({
		variables: { [searchQuery.searchBy]: searchQuery.search },
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
			selected: true,
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

	return (
		// TODO
		// data table actions
		// paginantion

		<React.Fragment>
			<UsersContext.Provider
				value={{
					dataList,
					setdataList,
					labelState,
					setLabelState,
					searchFields,
					setSearchFields,
				}}
			>
				<div className="container mx-auto px-4">
					<h1 className="text-3xl py-4 mb-1">Users</h1>

					<SearchFilter setSearchQuery={setSearchQuery} />
					<DataTable labels={labelState} />
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
				) : (
					<></>
				)}
			</UsersContext.Provider>
		</React.Fragment>
	);
}
