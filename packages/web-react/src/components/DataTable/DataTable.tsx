import React from "react";

export interface LabelKeyValue {
	key: string;
	value: string;
	selected?: boolean;
}

interface DataTableProps {
	labels: LabelKeyValue[];
	data: any;
}

export default function DataTable({ labels, data }: DataTableProps) {
	const DataListTable = data ? (
		data.map((item: any) => (
			<tr key={item.id}>
				<td className="border-dashed border-t border-gray-200 px-3">
					<label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
						<input
							type="checkbox"
							className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
						/>
					</label>
				</td>
				{labels.map(({ key, selected }, index) =>
					selected ? (
						<td
							className="border-dashed border-t border-gray-200 userName"
							key={index}
						>
							<span className="text-gray-700 px-6 py-3 flex items-center">
								{item[key]}
							</span>
						</td>
					) : (
						<React.Fragment key={index}></React.Fragment>
					)
				)}
			</tr>
		))
	) : (
		<></>
	);

	return (
		<React.Fragment>
			<div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
				<table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
					<thead>
						<tr className="text-left">
							<th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
								<label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
									<input
										type="checkbox"
										className="form-checkbox focus:outline-none focus:shadow-outline"
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
