import React from "react";
import "@styles/templates/container.scss";

function Container(props) {
	return <div className="template-container">{props.children}</div>;
}

export default Container;
