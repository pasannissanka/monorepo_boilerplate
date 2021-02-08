import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";

interface ListItemLinkProps {
	icon?: React.ReactElement;
	primary: string;
	to: string;
}

export default function Drawer(props: ListItemLinkProps[]) {

	return (
		<List>
			{props.map((prop, index) => {
				const renderLink = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
					(itemProps, ref) => {
						return <RouterLink to={prop.to} ref={ref} {...itemProps} />;
					}
				);

				return (
					<ListItem button component={renderLink} key={index}>
						{prop.icon ? <ListItemIcon>{prop.icon}</ListItemIcon> : null}
						<ListItemText primary={prop.primary} />
					</ListItem>
				);
			})}
		</List>
	);
}
