import React, { useEffect, useState } from "react";
import ActionItem from "./ActionItem";

export interface LabelKeyValue {
	key: string;
	value: string;
	selected?: boolean;
}

interface DataTableProps {
	labels: LabelKeyValue[];
	data: any[];
	setDataState: React.Dispatch<any>;
}

export default function DataTable({
	labels,
	data,
	setDataState,
}: DataTableProps) {
	const [allSelected, setAllSelected] = useState(false);
	const [anySelected, setAnySelected] = useState(false);

	useEffect(() => {
		if (!data.every((d) => d.selected)) {
			setAllSelected(false);
		}
	}, [data, allSelected]);

	useEffect(() => {
		if (data.some((d) => d.selected)) {
			setAnySelected(true);
		} else {
			setAnySelected(false);
		}
	}, [data, anySelected]);

	const handleAllElementsCheckbox = () => {
		setDataState([
			...data.map((user: any) => {
				return {
					...user,
					selected: !allSelected,
				};
			}),
		]);
		setAllSelected(!allSelected);
	};

	const handleElementCheckbox = (index: number) => {
		setDataState([
			...data.slice(0, index),
			{
				...data[index],
				selected: !data[index].selected,
			},
			...data.slice(index + 1),
		]);
	};

	const DataListTable = data ? (
		data.map((item: any, index: number) => (
			<tr key={item.id}>
				<td className="border-dashed border-t border-gray-200 px-3">
					<label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
						<input
							type="checkbox"
							className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
							checked={item.selected}
							onChange={() => handleElementCheckbox(index)}
						/>
					</label>
				</td>
				{labels.map(({ key, selected }, index) =>
					selected ? (
						<td className="border-dashed border-t border-gray-200" key={index}>
							<span className="text-gray-700 px-6 py-3 flex items-center">
								{item[key]}
							</span>
						</td>
					) : (
						<React.Fragment key={index}></React.Fragment>
					)
				)}
				<ActionItem id={item.id} index={index} />
			</tr>
		))
	) : (
		<></>
	);

	return (
		<React.Fragment>
			<div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
				<div className="bg-gray-100 h-11 border-b-2">
					{anySelected || allSelected ? (
						<div className="inline-flex">
							<button className="ml-2 mr-1 my-1 shadow rounded-lg inline-flex items-center bg-red-200 text-red-700 hover:bg-red-400 hover:text-white focus:outline-none focus:shadow-outline py-1 px-1 md:px-4 text-xs">
								<svg
									className="w-4 h-4"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
							<button className="mx-1 my-1 shadow rounded-lg inline-flex items-center bg-blue-200 text-blue-700 hover:bg-blue-400 hover:text-white focus:outline-none focus:shadow-outline py-1 px-1 md:px-4 text-xs">
								<svg
									className="w-4 h-4"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"
									/>
								</svg>
							</button>
						</div>
					) : null}
					<div className="inline-flex">
						<span className="inline-flex items-center mx-1 my-2 text-sm text-gray-500 py-2 px-1 md:px-2">
							Showing {data.length} of {data.length} result(s)
						</span>
					</div>
				</div>
				<table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
					<thead>
						<tr className="text-left">
							<th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
								<label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
									<input
										type="checkbox"
										className="form-checkbox focus:outline-none focus:shadow-outline"
										checked={allSelected}
										onChange={handleAllElementsCheckbox}
									/>
								</label>
							</th>
							{labels.map(({ value, selected }, index) =>
								selected ? (
									<th
										key={index}
										className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
									>
										{value}
									</th>
								) : (
									<React.Fragment key={index}></React.Fragment>
								)
							)}
							<th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>{DataListTable}</tbody>
					<tfoot>
						<tr className="text-left">
							<th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-white">
								<button>Next</button>
							</th>
							<th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-white">
								<button>Prev</button>
							</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</React.Fragment>
	);
}
