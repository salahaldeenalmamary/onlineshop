import React from "react";
import { Modal } from "antd";

function ModalSkeleton(props) {
	console.log(props);
	const [isModalOpen, setModelOpen] = React.useState(props.isOpen);

	const handleCancel = () => {
		setModelOpen(!isModalOpen);
	};

	return (
		<Modal title={props.title} open={isModalOpen} onCancel={handleCancel}>
			<p>Sample</p>
		</Modal>
	);
}

export default ModalSkeleton;
