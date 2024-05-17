import React from "react";
import Layout from "@components/Layout/Layout";
import { Outlet } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

function PublicRouting() {
	return (
		<ConfigProvider theme={{ algorithm: theme.compactAlgorithm }}>
			<Layout>
				<Outlet />
			</Layout>
		</ConfigProvider>
	);
}

export default PublicRouting;
