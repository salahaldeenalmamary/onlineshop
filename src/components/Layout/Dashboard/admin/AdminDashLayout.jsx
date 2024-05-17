import React from "react";
import { AdminMenu } from "@components/Menu/AdminMenu";
//icon imports
import {
	Dashboard,
	Scale,
	Inventory,
	Person,
	LocalShipping,
	Shop,
	AccountCircle
}
	from "@mui/icons-material";

const icons = {
	Dashboard: <Dashboard sx={{ color: "#444545" }} />,
	Client: <AccountCircle sx={{ color: "#444545" }} />,
	Scale: <Scale sx={{ color: "#444545" }} />,
	Product: <Inventory sx={{ color: "#444545" }} />,
	Person: <Person sx={{ color: "#444545" }} />,
	Delivery: <LocalShipping sx={{ color: "#444545" }} />,
	Order: <Shop sx={{ color: "#444545" }} />,
};

const PersistentDrawerLeft = React.lazy(() => import("@components/Drawer/Drawer"));

function AdminDashLayout({ children }) {
	return <PersistentDrawerLeft title="Admin" icons={icons} menu={AdminMenu}>{children}</PersistentDrawerLeft>;
}

export default React.memo(AdminDashLayout);
