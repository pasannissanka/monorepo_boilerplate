import {
	Avatar,
	Button,
	Card,
	Container,
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
import { useRegisterMutation } from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
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

export const Register = (props: any) => {
	const classes = useStyles();
	const history = useHistory();
	const [register] = useRegisterMutation();
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

	const registerValidationSchema = yup.object({
		firstName: yup.string().required("First name is required").max(30),
		lastName: yup.string().required("Last name is required").max(30),
		username: yup.string().required("Username is required"),
		email: yup
			.string()
			.email("Enter a valid Email")
			.required("Email is required"),
		password: yup
			.string()
			.min(6, "Password should be of minimum 6 characters")
			.required("Password is required"),
		retypePassword: yup.string().required("Password is required"),
	});

	return (
		<Grid
			container
			spacing={0}
			alignContent="center"
			justify="center"
			direction="column"
		>
			<Grid item style={{ textAlign: "start" }}>
				<Card variant="elevation" style={{ width: "100%" }}>
					<Container component="main" maxWidth="xs">
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlined />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign up
							</Typography>
							<Formik
								initialValues={{
									username: "",
									email: "",
									password: "",
									retypePassword: "",
									firstName: "",
									lastName: "",
								}}
								validationSchema={registerValidationSchema}
								onSubmit={(values, { setSubmitting }) => {
									register({
										variables: {
											email: values.email,
											password: values.password,
											username: values.username,
											firstName: values.firstName,
											lastName: values.lastName,
										},
									})
										.then((response) => {
											if (response.data?.register.user) {
												history.push("/");
											} else if (response.errors) {
												snackBarSetState({
													open: true,
													errorMsg: response.errors[0].message,
												});
											}
										})
										.catch((err) => {
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
										<Grid container spacing={1}>
											<Grid item xs={6}>
												<TextField
													error={touched.firstName && Boolean(errors.firstName)}
													helperText={touched.firstName && errors.firstName}
													value={values.firstName}
													onChange={handleChange}
													onBlur={handleBlur}
													variant="outlined"
													margin="normal"
													required
													fullWidth
													id="firstName"
													label="First name"
													name="firstName"
												/>
											</Grid>
											<Grid item xs={6}>
												<TextField
													error={touched.lastName && Boolean(errors.lastName)}
													helperText={touched.lastName && errors.lastName}
													value={values.lastName}
													onChange={handleChange}
													onBlur={handleBlur}
													variant="outlined"
													margin="normal"
													required
													fullWidth
													id="lastName"
													label="Last name"
													name="lastName"
												/>
											</Grid>
										</Grid>
										<TextField
											error={touched.username && Boolean(errors.username)}
											helperText={touched.username && errors.username}
											value={values.username}
											onChange={handleChange}
											onBlur={handleBlur}
											variant="outlined"
											margin="normal"
											required
											fullWidth
											id="username"
											label="User name"
											name="username"
										/>
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
										<TextField
											error={
												touched.retypePassword && Boolean(errors.retypePassword)
											}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.retypePassword}
											helperText={
												touched.retypePassword && errors.retypePassword
											}
											variant="outlined"
											margin="normal"
											required
											fullWidth
											name="retypePassword"
											label="Re enter Password"
											type="password"
											id="retypePassword"
											autoComplete="current-password"
										/>
										<Typography variant="body1">
											By clicking Sign Up, you agree to our Terms and that you
											have read our Privacy Policy
										</Typography>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											className={classes.submit}
											disabled={isSubmitting}
										>
											Sign Up
										</Button>
										<Grid container>
											{/* <Grid item xs>
											<Link href="#" variant="body2">
												Forgot password?
											</Link>
										</Grid> */}
											<Grid item>
												<Link
													component={RouterLink}
													to="/login"
													variant="body2"
												>
													{"Already have an account? Sign In"}
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
