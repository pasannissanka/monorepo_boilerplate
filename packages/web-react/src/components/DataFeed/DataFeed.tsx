import React from "react";
import { DataTableContext, DataTableState } from "../DataTable/Context/DataTableContext";
import Feed from "./Feed";

interface DataFeedProps extends DataTableState {}

export default function DataFeed(props: DataFeedProps) {
	return (
    <React.Fragment>
      <DataTableContext.Provider value={props}>
        <Feed />
      </DataTableContext.Provider>
    </React.Fragment>
  );
}
