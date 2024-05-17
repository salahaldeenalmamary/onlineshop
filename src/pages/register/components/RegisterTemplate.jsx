import React from "react";
import {
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    MenuItem,
    Container,
    Typography,
    Select,
    FormControl,
    InputLabel,
    FormHelperText
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { MuiTelInput } from "mui-tel-input";
import { useDebounce } from "@hooks/UseDebounce";
import { message } from "antd";
import { toast } from "react-toastify";

const Footer = React.lazy(() => import("@components/Footer/Footer"));

import { RegisterRequest } from "@controllers/RegisterController";
import { GetRoles } from "@controllers/RoleController";

const theme = createTheme();

function RegisterTemplate() {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const [phone, setPhone] = React.useState("");
    const [securityToken, setSecurityToken] = React.useState("");
    const [securityError, setSecurityError] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    //TODO: Get adminSecurity from Email and verify token
    const adminSecurityToken = "AdminActivateApp";

    const debouncedValue = useDebounce(phone, 300);
    const tokenDebouncedValue = useDebounce(securityToken, 300);

    const { data: roles, isLoading } = useQuery(["roles"], GetRoles);

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

    //Mutate Register
    const { mutate: registerRequest } = useMutation(RegisterRequest, {
        onSuccess: (results) => {
            if (results.customerID !== 0) {
                setLoading(false);
                toast("Successfully Registered");
                navigate("/login");
            } else {
                setLoading(false);
                notify("Registration Failed");
            }
        },
        onError: () => {
            notify("Registration Failed");
            setLoading(false);
        },
    });

    const { values, errors, submitForm, handleChange } = useFormik({
        initialValues: {
            Name: "",
            Surname: "",
            Email: "",
            Password: "",
            Status: true,
            RoleID: 0,
            Phone: "",
        },
        validationSchema: yup.object().shape({
            Name: yup.string().required("Required"),
            Surname: yup.string().required("Required"),
            Email: yup.string().email("Invalid email format").required("Required"),
            Password: yup.string().required("Required"),
            RoleID: yup.number().min(1).required("Required")
        }),
        onSubmit: (values) => {
            registerRequest(values);
            setLoading(!loading);
        },
    });

    const handlePhoneInput = (value) => {
        setPhone(value);
    };

    const handleValidateToken = (value) => {
        setDisabled(true);
        setSecurityToken(value);
    };

    React.useEffect(() => {
        values.Phone = debouncedValue;
    }, [debouncedValue]);

    React.useEffect(() => {
        if (tokenDebouncedValue == adminSecurityToken) {
            setDisabled(false);
            setSecurityError("");
        }
        else {
            setSecurityError("Invalid Admin Token");
        }
    }, [tokenDebouncedValue]);

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
                        Sign up
                    </Typography>
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    autoComplete="given-name"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="Name"
                                    size="small"
                                    label="First Name"
                                    autoFocus
                                    error={!!errors.Name}
                                    helperText={errors.Name}
                                    value={values.Name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="Surname"
                                    label="Last Name"
                                    name="Surname"
                                    autoComplete="family-name"
                                    size="small"
                                    error={!!errors.Surname}
                                    helperText={errors.Surname}
                                    value={values.Surname}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MuiTelInput
                                    margin="dense"
                                    aria-label="Phone"
                                    label="Phone"
                                    defaultCountry="US"
                                    value={phone}
                                    onChange={handlePhoneInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="Email"
                                    label="Email Address"
                                    name="Email"
                                    autoComplete="Email"
                                    size="small"
                                    type="email"
                                    error={!!errors.Email}
                                    helperText={errors.Email}
                                    value={values.Email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    name="Password"
                                    label="Password"
                                    type="password"
                                    id="Password"
                                    autoComplete="new-password"
                                    size="small"
                                    error={!!errors.Password}
                                    helperText={errors.Password}
                                    value={values.Password}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    margin="dense"
                                    size="small"
                                    fullWidth
                                    id="RoleID"
                                    name="RoleID"
                                    labelId="role-label"
                                    label="Role"
                                    error={!!errors.RoleID}
                                    value={values.RoleID}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Select Role</MenuItem>
                                    {!isLoading && roles.map((role) =>
                                        <MenuItem
                                            key={role.roleID}
                                            value={role.roleID}
                                        >
                                            {role.name}
                                        </MenuItem>
                                    )}
                                </Select>
                                <FormHelperText>{errors.RoleID}</FormHelperText>
                            </FormControl>
                        </Grid>
                        {
                            values.RoleID == 1 ? (<Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="SecurityToken"
                                    label="Admin Token"
                                    name="SecurityToken"
                                    size="small"
                                    error={!!securityError}
                                    helperText={securityError}
                                    value={securityToken}
                                    onChange={(e) => { handleValidateToken(e.target.value) }}
                                />
                            </Grid>) : ""
                        }
                        <LoadingButton
                            disabled={disabled}
                            loadingIndicator="Wait Please ..."
                            loading={loading}
                            size="small"
                            onClick={submitForm}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={link} to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Footer />
            </Container>
        </ThemeProvider >
    );
}
export default React.memo(RegisterTemplate);