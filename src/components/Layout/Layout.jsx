import React from "react";

const Navbar = React.lazy(() => import("@components/Navbar/Navbar"));
const Footer = React.lazy(() => import("@components/Footer/Footer"));

function Layout(props) {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<section>{props.children}</section>
			<Footer />
		</>
	);
}

export default Layout;
