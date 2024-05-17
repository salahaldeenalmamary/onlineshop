import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import { DefaultMenu } from "@components/Menu/DefaultMenu";

//icon imports
import {
	Dashboard,
	PlaylistAdd,
	Person,
	Scale
}
	from "@mui/icons-material";

const icons = {
	Dashboard: <Dashboard sx={{ color: "#444545" }} />,
	Favorite: <PlaylistAdd sx={{ color: "#444545" }} />,
	Order: <Scale sx={{ color: "#444545" }} />,
	Person: <Person sx={{ color: "#444545" }} />,
};

const PersistentDrawerLeft = React.lazy(() => import("@components/Drawer/Drawer"));

function ClientDashLayout({ children }) {
	const {
		items
	} = useCart();
	console.log(items);
	const location = useLocation();
	const [orderItems, setOrderItems] = React.useState(null);

	React.useEffect(() => {
		if (location == null || location == undefined) {
			setOrderItems(items);
		}
	}, [items]);
	console.log(orderItems);

	return <PersistentDrawerLeft title="Client" icons={icons} menu={DefaultMenu}>{children}</PersistentDrawerLeft>;
}

export default React.memo(ClientDashLayout);
