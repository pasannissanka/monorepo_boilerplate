import React, { Dispatch, forwardRef, LegacyRef, SetStateAction } from "react";
import { LabelKeyValue } from "./DataTable";

interface FilterMenuProps {
	items: LabelKeyValue[];
	setItemsState: Dispatch<SetStateAction<LabelKeyValue[]>>;
	type: "checkbox" | "radio";
}

function FilterMenu(
	{ items, setItemsState, type }: FilterMenuProps,
	ref: LegacyRef<HTMLDivElement>
) {
	const handleCheckOnChange = (event: React.ChangeEvent, index: number) => {
		if (type === "checkbox") {
			setItemsState([
				...items.slice(0, index),
				{
					...items[index],
					selected: !items[index].selected,
				},
				...items.slice(index + 1),
			]);
		}
		if (type === "radio") {
			items = items.map((i) => {
				return {
					...i,
					selected: false,
				};
			});
			items[index].selected = true;
			setItemsState([...items]);
		}
	};

	return (
		<div
			ref={ref}
			className="z-10 absolute top-0 left-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden"
		>
			{items.map(({ value, selected }, index) => (
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
							onChange={(event) => handleCheckOnChange(event, index)}
						/>
					</div>
					<div className="select-none text-gray-700">{value}</div>
				</label>
			))}
		</div>
	);
}

export default forwardRef(FilterMenu);
