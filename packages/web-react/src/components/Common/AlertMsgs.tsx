import { Snackbar } from "@material-ui/core";
import React from "react";

interface AlertProps {
	vertical: any;
	horizontal: any;
	open: boolean;
	handleClose: any;
	message: string;
}

export const Alert = (props: AlertProps) => {
	const { vertical, horizontal, handleClose, open, message } = props;
	return (
		<React.Fragment>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				onClose={handleClose}
				message={message}
				key={vertical + horizontal}
        autoHideDuration={6000}
			/>
		</React.Fragment>
	);
};
