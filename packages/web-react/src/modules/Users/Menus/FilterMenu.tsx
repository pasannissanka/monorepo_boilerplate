import React from "react";

interface FilterMenuProps {}

export default function FilterMenu(props: FilterMenuProps) {
	return (
		<div className="z-40 absolute top-0 right-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden">
			<label className="flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2">
				<div className="text-teal-600 mr-3">
					<input
						type="checkbox"
						className="form-checkbox focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="select-none text-gray-700"></div>
			</label>
		</div>
	);
}
