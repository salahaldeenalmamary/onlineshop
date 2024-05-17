import React from 'react'
import { GridToolbar, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

function CustomToolBar({ create }) {
    return (
        <div
            style={{
                borderRadius: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            className="custom-tool-bar"
        >

            <div>
                <GridToolbarQuickFilter size="small" sx={{ color: "white", padding: 0 }} />
            </div>
            <div>
                <GridToolbar />
            </div>
            <div>
                <Button
                    variant="contained"
                    onClick={create}
                    sx={{
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        position: "relative",
                        width: "auto",
                        background: "#e1b382",
                        color: "white",
                    }}
                >
                    New
                </Button>
            </div>
        </div>
    );
}

export default React.memo(CustomToolBar);