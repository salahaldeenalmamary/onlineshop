import React from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppTheme from "../themes/AppTheme";

const theme = createTheme(AppTheme);

function AuthenticateRouting() {
    return (
        <ThemeProvider theme={theme}>
            <Outlet />
        </ThemeProvider>
    );
}

export default AuthenticateRouting;