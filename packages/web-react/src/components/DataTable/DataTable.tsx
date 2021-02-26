import React from "react";
import { DataTableContext, DataTableState } from "./Context/DataTableContext";
import SearchFilter from "./SearchFilter";
import Table from "./Table";

interface DataTableInputs extends DataTableState {
	globalActions?: React.ReactNode;
}

export interface SearchFields {
	search: string;
	searchBy: string;
	limit: number;
	offset: number;
}

export default function DataTable(props: DataTableInputs) {
	return (
		<React.Fragment>
			<DataTableContext.Provider value={props}>
				<SearchFilter globalActions={props.globalActions} />
				<Table />
			</DataTableContext.Provider>
		</React.Fragment>
	);
}
