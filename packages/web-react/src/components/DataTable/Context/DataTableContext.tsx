import { createContext, useContext } from "react";
import { SearchFields } from "../DataTable";
import { LabelKeyValue } from "../Table";

export interface DataTableState {
	totalCount: number | undefined;
	dataList: any[];
  loading: boolean;
	setdataList: React.Dispatch<any>;
	labelState: LabelKeyValue[];
	setLabelState: React.Dispatch<React.SetStateAction<LabelKeyValue[]>>;
	searchFields: LabelKeyValue[];
	setSearchFields: React.Dispatch<React.SetStateAction<LabelKeyValue[]>>;
	setSearch: React.Dispatch<React.SetStateAction<SearchFields>>;
	search: SearchFields;
}

export const DataTableContext = createContext<DataTableState>({
  loading: true,
	dataList: [],
  totalCount: 0,
	labelState: [],
	searchFields: [],
	search: { limit: 0, offset: 0, search: "", searchBy: "" },
	setSearch: () => {},
	setdataList: () => {},
	setLabelState: () => {},
	setSearchFields: () => {},
});

export const useDataTableContext = () => useContext(DataTableContext);
