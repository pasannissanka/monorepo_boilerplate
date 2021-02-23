import React, { Dispatch, SetStateAction } from "react";
import { LabelKeyValue } from "../../../components/DataTable/DataTable";

interface FilterMenuProps {
	labels: LabelKeyValue[];
	setLabelState: Dispatch<SetStateAction<LabelKeyValue[]>>;
}

export default function FilterMenu({ labels, setLabelState }: FilterMenuProps) {
	const toggleChecked = (index: number) => {
		setLabelState([
			...labels.slice(0, index),
			{
				...labels[index],
				selected: !labels[index].selected,
			},
			...labels.slice(index + 1),
		]);
	};

	return (
		<div className="z-10 absolute top-0 right-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden">
			{labels.map(({ value, selected }, index) => (
				<label
					key={index}
					className="flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2"
				>
					<div className="text-teal-600 mr-3">
						<input
							type="checkbox"
							className="form-checkbox focus:outline-none focus:shadow-outline"
							defaultChecked={selected}
							onClick={() => toggleChecked(index)}
						/>
					</div>
					<div className="select-none text-gray-700">{value}</div>
				</label>
			))}
		</div>
	);
}
