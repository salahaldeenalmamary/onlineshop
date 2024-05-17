import React from 'react';
import { Link, Typography } from "@mui/material";

function Copyright() {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 5, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://www.ethernmyth.cf">
                Ethern Myth
            </Link>{" "}
            2023
            {"."}
        </Typography>
    );
}

export default Copyright