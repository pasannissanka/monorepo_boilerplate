import {
	Avatar,
	Button,
	Card,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Link,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import { Alert } from "../../../components/Common/AlertMsgs";
import { useLoginMutation } from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100%",
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(2),
	},
	paper: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const Login = (props: any) => {
	const classes = useStyles();
	const history = useHistory();
	const [login] = useLoginMutation();
	const [snackBarState, snackBarSetState] = React.useState<any>({
		open: false,
		errorMsg: "",
	});

	const handleClose = () => {
		snackBarSetState({ ...snackBarState, open: false });
	};

	const ErrorMsg = (
		<Alert
			vertical="bottom"
			horizontal="center"
			open={snackBarState.open}
			handleClose={handleClose}
			message={snackBarState.errorMsg}
		/>
	);

	const loginValidationSchema = yup.object({
		email: yup
			.string()
			.email("Enter a valid Email")
			.required("Email is required"),
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters")
			.required("Password is required"),
	});

	return (
		<Grid
			container
			spacing={0}
			alignContent="center"
			justify="center"
			direction="column"
		>
			<Grid item style={{textAlign: "center"}}>
				<Card variant="elevation" style={{ width: "100%" }}>
					<Container component="main" maxWidth="xs">
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlined />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
							<Formik
								initialValues={{ email: "", password: "", rememberMe: false }}
								validationSchema={loginValidationSchema}
								onSubmit={(values, { setSubmitting }) => {
									setSubmitting(false);
									login({
										variables: {
											emailOrUserName: values.email,
											password: values.password,
										},
									})
										.then((response) => {
											if (
												response.data?.login.token &&
												response.data.login.user
											) {
												localStorage.setItem(
													"auth_token",
													response.data.login.token
														? response.data.login.token
														: ""
												);
												history.push("/");
											} else if (response.data?.login.errors) {
												snackBarSetState({
													open: true,
													errorMsg: response.data.login.errors[0].message,
												});
											}
										})
										.catch((error) => {
											snackBarSetState({
												open: true,
												errorMsg: "Internal server error",
											});
										});
								}}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting,
									/* and other goodies */
								}) => (
									<Form
										className={classes.form}
										noValidate
										onSubmit={handleSubmit}
									>
										<TextField
											error={touched.email && Boolean(errors.email)}
											helperText={touched.email && errors.email}
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
											variant="outlined"
											margin="normal"
											required
											fullWidth
											id="email"
											label="Email Address"
											name="email"
											autoComplete="email"
										/>
										<TextField
											error={touched.password && Boolean(errors.password)}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											helperText={touched.password && errors.password}
											variant="outlined"
											margin="normal"
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											id="password"
											autoComplete="current-password"
										/>
										<FormControlLabel
											control={
												<Checkbox
													value="remember"
													color="primary"
													name="rememberMe"
													onChange={handleChange}
												/>
											}
											label="Remember me"
										/>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											className={classes.submit}
											disabled={isSubmitting}
										>
											Sign In
										</Button>
										<Grid container>
											<Grid item xs>
												<Link href="#" variant="body2">
													Forgot password?
												</Link>
											</Grid>
											<Grid item>
												<Link
													component={RouterLink}
													to="/register"
													variant="body2"
												>
													{"Don't have an account? Sign Up"}
												</Link>
											</Grid>
										</Grid>
									</Form>
								)}
							</Formik>
							{ErrorMsg}
						</div>
					</Container>
				</Card>
			</Grid>
		</Grid>
	);
};
