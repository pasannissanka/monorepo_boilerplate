import { createContext, useContext } from "react";
import { LabelKeyValue } from "../../components/DataTable/DataTable";

interface UserContextType {
	dataList: any[];
	setdataList: React.Dispatch<any>;
	labelState: LabelKeyValue[];
	setLabelState: React.Dispatch<React.SetStateAction<LabelKeyValue[]>>;
	searchFields: LabelKeyValue[];
	setSearchFields: React.Dispatch<React.SetStateAction<LabelKeyValue[]>>;
}

export const UsersContext = createContext<UserContextType>({
	dataList: [],
	labelState: [],
	searchFields: [],
	setdataList: () => {},
	setLabelState: () => {},
	setSearchFields: () => {},
});

export const useUsersContext = () => useContext(UsersContext);
