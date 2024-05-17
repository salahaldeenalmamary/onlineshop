import React from "react";
import "@styles/register.scss";
import Template from "@components/Templates/Container";
import RegisterTemplate from "@pages/register/components/RegisterTemplate";

const Banner = React.lazy(() => import("@components/Banner/Banner"));

function Register() {
	return (
		<Template>
			<div className="register-body">
				<RegisterTemplate />
			</div>
			<div className="register-banner">
				<Banner />
			</div>
		</Template>
	);
}

export default React.memo(Register);
