import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable, { LabelKeyValue } from "../../components/DataTable/DataTable";
import ModalPanel from "../../components/ModalPanel/ModelPanel";
import { useGetUsersQuery } from "../../generated/graphql";
import FilterMenu from "./Menus/FilterMenu";

interface UsersProps {}

export default function Users(props: UsersProps) {
	const { data } = useGetUsersQuery();
	const container = React.createRef<HTMLDivElement>();

	const [filterMenuToggle, setFilterMenuToggle] = useState(false);
	const [modalToggle, setmodalToggle] = useState(false);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

	const handleClickOutside = (event: any) => {
		if (container.current && !container.current.contains(event.target)) {
			setFilterMenuToggle(false);
		}
	};

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

	return (
		// TODO
		// data table actions
		// paginantion

		<React.Fragment>
			<div className="container mx-auto px-4" ref={container}>
				<h1 className="text-3xl py-4 mb-1">Users</h1>

				<div className="mb-4 flex justify-end items-center">
					{/* Search/ filter box */}
					<div className="flex-1 pr-4">
						<div className="relative md:w-1/3">
							<input
								type="search"
								className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
								placeholder="Search..."
							/>
							<div className="absolute top-0 left-0 inline-flex items-center p-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6 text-gray-400"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
									<circle cx="10" cy="10" r="7" />
									<line x1="21" y1="21" x2="15" y2="15" />
								</svg>
							</div>
						</div>
					</div>

					{/* <div className="flex-1">
						<button className="shadow  rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4">
							<span className="hidden md:block">Search</span>
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
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					</div> */}

					<div>
						{/* Row display */}
						<div className="shadow rounded-lg flex">
							<div className="relative">
								<button
									className="rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4"
									onClick={() => setFilterMenuToggle(!filterMenuToggle)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 md:hidden"
										viewBox="0 0 24 24"
										strokeWidth="2"
										stroke="currentColor"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect
											x="0"
											y="0"
											width="24"
											height="24"
											stroke="none"
										></rect>
										<path d="M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5" />
									</svg>
									<span className="hidden md:block">Display</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-5 h-5 ml-1"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										strokeWidth="2"
										stroke="currentColor"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect
											x="0"
											y="0"
											width="24"
											height="24"
											stroke="none"
										></rect>
										<polyline points="6 9 12 15 18 9" />
									</svg>
								</button>
								{filterMenuToggle ? (
									<FilterMenu
										labels={labelState}
										setLabelState={setLabelState}
									/>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
					<div className="ml-2">
						<button
							className="shadow  rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4"
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
				</div>
				<DataTable data={data?.getUsers.users} labels={labelState} />
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
		</React.Fragment>
	);
}
