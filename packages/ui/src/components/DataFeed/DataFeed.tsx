import * as React from "react";
import { DataTableContext } from "../DataTable";
import Feed from "./Feed";
import { DataFeedProps } from "./types";

export function DataFeed(props: DataFeedProps) {
	return (
		<React.Fragment>
			<DataTableContext.Provider value={props}>
				<Feed />
			</DataTableContext.Provider>
		</React.Fragment>
	);
}
