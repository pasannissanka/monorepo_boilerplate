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
import * as yup from "yup";
import { Link as RouterLink } from "react-router-dom";
// import { useLoginMutation } from '../../../generated/graphql';

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
	// const [login, {data, error}] = useLoginMutation()

	// login({variables: {emailOrUserName: 'pasan', password: '1234'}})
	// console.log(data)
	// console.log(error)

	const registerValidationSchema = yup.object({
		username: yup.string().required("Username is required"),
		email: yup
			.string()
			.email("Enter a valid Email")
			.required("Email is required"),
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters")
			.required("Password is required"),
		retypePassword: yup.string().required("Password is required"),
		tos: yup.boolean().isTrue("I agree to the terms of service"),
	});

	return (
		<React.Fragment>
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
								tos: false,
							}}
							validationSchema={registerValidationSchema}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));

									setSubmitting(false);
								}, 400);
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
										helperText={touched.retypePassword && errors.retypePassword}
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
									<FormControlLabel
										control={
											<Checkbox
												value="tos"
												color="primary"
												name="tos"
												onChange={handleChange}
											/>
										}
										label={
											touched.tos && Boolean(errors.tos)
												? errors.tos
												: "I agree to the terms of service"
										}
									/>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={
											isSubmitting || (touched.tos && Boolean(errors.tos))
										}
									>
										Sign In
									</Button>
									<Grid container>
										{/* <Grid item xs>
											<Link href="#" variant="body2">
												Forgot password?
											</Link>
										</Grid> */}
										<Grid item>
											<Link component={RouterLink} to="/login" variant="body2">
												{"Already have an account? Sign In"}
											</Link>
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>
					</div>
				</Container>
			</Card>
		</React.Fragment>
	);
};
