import React from "react";
import {
	CssBaseline,
	TextField,
	Link,
	Grid,
	Box,
	Container,
	Typography
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useAuth } from "@auth/Authorize";
import { message } from "antd";

const Footer = React.lazy(() => import("@components/Footer/Footer"));

import { LoginRequest } from "@controllers/LoginController";

const theme = createTheme();

function LoginTemplate() {
	const auth = useAuth();
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	function notify(value) {
		messageApi.open({
			icons: {
				icon: undefined,
			},
			content: value,
			duration: 0,
		});
		setTimeout(messageApi.destroy, 2000);
	}

	const { mutate: loginRequest } = useMutation(LoginRequest, {
		onSuccess: (results) => {
			auth.setToken(results.token);
			auth.setId(results.customer.customerID);
			auth.setRole(results.customer.roles.name);
			auth.setIsLoggedIn(true);
			switch (results.customer.roles.name) {
				case "Admin":
					navigate("/dashboard/admin");
					break;
				case "Customer":
					navigate("/dashboard/client");
					break;
			}
			setLoading(false);
		},
		onError: () => {
			notify("Error Occurred");
			setLoading(false);
		},
	});

	const { values, errors, submitForm, handleChange } = useFormik({
		initialValues: {
			Email: "",
			Password: "",
		},
		validationSchema: yup.object().shape({
			Email: yup.string().email("Invalid Email Format").required("Required"),
			Password: yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			loginRequest(values);
			setLoading(!loading);
		},
	});

	return (
		<ThemeProvider theme={theme}>
			{contextHolder}
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
					}}
				>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" sx={{ mt: 1 }}>
						<TextField
							margin="dense"
							required
							fullWidth
							id="Email"
							label="Email Address"
							name="Email"
							autoComplete="Email"
							autoFocus
							size="small"
							error={!!errors.Email}
							helperText={errors.Email}
							value={values.Email}
							onChange={handleChange}
						/>
						<TextField
							margin="dense"
							required
							fullWidth
							name="Password"
							label="Password"
							type="password"
							id="Password"
							autoComplete="current-password"
							size="small"
							error={!!errors.Password}
							helperText={errors.Password}
							value={values.Password}
							onChange={handleChange}
						/>
						<LoadingButton
							loadingIndicator="Signing in..."
							loading={loading}
							size="small"
							onClick={submitForm}
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</LoadingButton>
						<Grid
							container
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
							}}
						>
							<Grid item xs={12}>
								<Link
									component={link}
									to="/register"
									variant="body2"
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										width: "100%",
									}}
								>
									"Don't have an account? Sign Up"
								</Link>
							</Grid>
							<Grid item xs={12}>
								<Link component={link} to="/" variant="body2">
									{"Return Home"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Footer />
			</Container>
		</ThemeProvider>
	);
}

export default React.memo(LoginTemplate);
