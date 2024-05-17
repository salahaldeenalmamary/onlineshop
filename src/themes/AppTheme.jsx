import { createTheme } from "@mui/material";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

const AppTheme = createTheme({
	typography: {
		allVariants: {
			fontFamily: "'Poppins'",
			fontWeightLight: 200,
			fontWeightRegular: 400,
			fontWeightMedium: "bold",
			color: "#444545",
		},
	},
	palette: {
		chip: {
			main: "red",
		},
		primary: {
			light: "#757ce8",
			main: "#e1b382",
			dark: "#1976d2",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff7961",
			main: "#f44336",
			dark: "#ba000d",
			contrastText: "#000",
		},
		text: {
			disabled: "#000000",
		},
	},
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					h1: "h2",
					h2: "h2",
					h3: "h2",
					h4: "h2",
					h5: "h2",
					h6: "h2",
					subtitle1: "h2",
					subtitle2: "h2",
					body1: "span",
					body2: "span",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 18px",
				},
			},
			variants: [
				{
					props: { disabled: true },
					style: {},
				},
			],
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					padding: 0,
					fontSize: "1.5rem",
					color: "#fff !important"
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					border: "none",
					boxShadow: "none",
				},
			},
		},
		// The tab component
		MuiTabs: {
			styleOverrides: {
				indicator: {
					backgroundColor: "#e1b382",
					height: 2.5,
					padding: 0,
					borderRadius: "10px"
				},
				flexContainer: {
					padding: 0
				}
			},
		},
		// The tab itself
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: "none",
					color: "black",
				},
			},
		},
		MuiButtonGroup: {
			variants: [
				{
					props: { variant: "spaced" },
					style: {
						marginTop: "30px",
						"& > *:not(:last-child)": {
							marginRight: "5px",
						},
					},
				},
			],
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					justifyContent: "space-between"
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					padding: 0
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					background: "#e1b382",
					color: "#fff",
					height: "75px",
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					marginRight: "0px !important"
				},
			},
		},
		// Styles for the Side  nav bar
		MuiDrawer: {
			styleOverrides: {
				paper: {
					background: "#e1b382",
					color: "#fff",
				},
			},
		},
		MuiDataGrid: {
			styleOverrides: {
				root: {
					borderRadius: "10px",
					border: "none",
					boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
					padding: "5px 5px 0px 5px",
					backgroundColor: "#FFFFFF",
					"& .MuiDataGrid-columnsContainer": {
						padding: "0px 5px 0px 5px",
						borderRadius: 4,
						borderBottom: 1,
					},
					// Headers
					"& .MuiDataGrid-columnHeader:focus": {
						border: "none !important",
						outline: "none !important",
					},
					"& .MuiDataGrid-columnHeader:hover": {
						border: "none !important",
						outline: "none !important",
					},
					"& .MuiDataGrid-columnHeader:active": {
						border: "none !important",
						outline: "none !important",
					},
					"&  .MuiDataGrid-columnHeader--sorted": {
						border: "none !important",
						outline: "none !important",
						borderBottom: "1px black",
					},
					// Style the header of the grid
					"& .MuiDataGrid-columnHeader": {
						backgroundColor: "#6bb2c9",
					},
					"& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
						color: "white",
					},
					// Edit each cell
					// "& .MuiDataGrid-cell": {
					// 	fontSize: "13px",
					// },
					"& .MuiDataGrid-cell:focus": {
						outline: 0,
					},

					"& .MuiDataGrid-row.even": {
						backgroundColor: "WhiteSmoke",
					},
					"& .MuiDataGrid-row.inactive": {
						opacity: "50%",
					},
					// Toolbar
				},
			},
		},
	},
});

export default AppTheme;
