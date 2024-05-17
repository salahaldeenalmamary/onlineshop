import React from "react";
import "@styles/login.scss";
import Template from "@components/Templates/Container";
import LoginTemplate from "@pages/login/components/LoginTemplate";

const Banner = React.lazy(() => import("@components/Banner/Banner"));

function Login() {
	return (
		<Template>
			<div className="login-banner">
				<Banner />
			</div>
			<div className="login-body">
				<LoginTemplate />
			</div>
		</Template>
	);
}

export default React.memo(Login);
