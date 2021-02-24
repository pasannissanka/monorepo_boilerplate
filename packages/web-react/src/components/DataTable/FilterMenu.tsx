import React, { forwardRef, LegacyRef } from "react";
import { useUsersContext } from "../../modules/Users/UserContext";

interface FilterMenuProps {
	type: "checkbox" | "radio";
}

function FilterMenu({ type }: FilterMenuProps, ref: LegacyRef<HTMLDivElement>) {
	const {
		labelState,
		setLabelState,
		searchFields,
		setSearchFields,
	} = useUsersContext();

	const handleCheckOnChange = (index: number, key: string) => {
		if (type === "checkbox") {
			setLabelState([
				...labelState.slice(0, index),
				{
					...labelState[index],
					selected: !labelState[index].selected,
				},
				...labelState.slice(index + 1),
			]);
		}
		if (type === "radio") {
			setSearchFields([
				...searchFields.map((label) => {
					return {
						...label,
						selected: label.key === key ? true : false,
					};
				}),
			]);
		}
	};

	const labels = type === "checkbox" ? labelState : searchFields;

	return (
		<div
			ref={ref}
			className="z-10 absolute top-0 left-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden"
		>
			{labels.map(({ value, selected, key }, index) => (
				<label
					key={index}
					className="flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2"
				>
					<div className="text-teal-600 mr-3">
						<input
							type={type}
							className="form-checkbox focus:outline-none focus:shadow-outline"
							value={value}
							checked={selected}
							onChange={() => handleCheckOnChange(index, key)}
						/>
					</div>
					<div className="select-none text-gray-700">{value}</div>
				</label>
			))}
		</div>
	);
}

export default forwardRef(FilterMenu);
