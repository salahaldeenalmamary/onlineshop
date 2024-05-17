import React from "react";
import "@styles/home.scss";

const Products = React.lazy(() => import("@pages/products/Index"));

function Index() {
	return (
		<div className="container">
			<Products />
		</div>
	);
}

export default Index;
