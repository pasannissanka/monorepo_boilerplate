import * as React from "react";
import { useHistory } from "react-router-dom";
import { useDataTableContext } from "./Context/DataTableContext";
import FilterMenu from "./FilterMenu";
import { SearchFilterProps } from "./types";

/**
 * Primary UI component search/ filter data elements
 * TODO : Search by multiple fields
 * 
 */
export function SearchFilter(props: SearchFilterProps) {
	const { searchFields, search, setSearch } = useDataTableContext();

	const history = useHistory();
	const container = React.createRef<HTMLDivElement>();
	const [toggleMenus, setToggleMenus] = React.useState({
		filter: false,
		search: false,
	});
	const [searchQ, setsearchQ] = React.useState({ search: "" });

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setsearchQ({ search: event.target.value });
	};

	const handleClickOutside = (event: any) => {
		if (container.current && !container.current.contains(event.target)) {
			setToggleMenus({
				filter: false,
				search: false,
			});
		}
	};

	const selectedSearch = searchFields!.find((field) => field.selected);

	const handleSetSearchQuery = () => {
		setSearch!({
			...search!,
			offset: 0,
			search: searchQ.search,
			searchBy: selectedSearch!.key,
		});
		history.push({
			search: `?${selectedSearch?.key}=${searchQ.search.toString()}`,
		});
	};

	return (
		<React.Fragment>
			<div className="mb-4 flex justify-start items-center">
				{/* Search/ filter box */}
				<div className="flex">
					<div className="relative">
						<input
							type="search"
							name="search"
							className="w-auto pl-10 pr-4 py-2 rounded-lg rounded-r-none shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium text-sm"
							placeholder="Search by..."
							value={searchQ.search}
							onChange={handleChange}
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

				<div className="flex">
					<div className="relative">
						<button
							className="shadow rounded-none inline-flex items-center bg-transparent hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 py-2 px-2 md:px-4 text-sm"
							onClick={() =>
								setToggleMenus({ ...toggleMenus, search: !toggleMenus.search })
							}
						>
							<span className="hidden md:block">{selectedSearch?.value}</span>
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
								<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</button>
						{toggleMenus.search ? (
							<FilterMenu ref={container} type="radio" />
						) : null}
						<button
							className="shadow rounded-lg rounded-l-none inline-flex items-center bg-transparent hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 py-2 px-2 md:px-4 text-sm"
							onClick={handleSetSearchQuery}
						>
							<span className="hidden md:block">Search</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5"
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
						</button>
					</div>
				</div>

				<div className="md:flex-1"></div>

				<div>
					{/* Row display */}
					<div className="relative">
						<div className="flex">
							<button
								className="shadow rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4 text-sm"
								onClick={() =>
									setToggleMenus({
										...toggleMenus,
										filter: !toggleMenus.filter,
									})
								}
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
									<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
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
									<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
									<polyline points="6 9 12 15 18 9" />
								</svg>
							</button>
							{toggleMenus.filter ? (
								<FilterMenu ref={container} type="checkbox" />
							) : null}
						</div>
					</div>
				</div>
				{/* Add */}

				{props.globalActions}
			</div>
		</React.Fragment>
	);
}
