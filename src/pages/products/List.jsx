import React from "react";
import {
	Card,
	Col,
	Row,
	Divider,
	Typography,
	QRCode,
	Button,
	InputNumber,
	Tooltip,
	message,
	Badge,
} from "antd";
import { formatter } from "@utils/CurrencyFormatter";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const URL = document.URL;

function List({ products }) {
	const { addItem } = useCart();
	const [quantity, setQuantity] = React.useState(1);
	const [messageApi, contextHolder] = message.useMessage();
	const quantityInput = React.useRef();

	function onChange(value) {
		if (value < 1 || value == null) setQuantity(1);
		else setQuantity(value);
	}

	function notify(value) {
		messageApi.open({
			icons: {
				icon: undefined,
			},
			content: value,
			duration: 0,
		});
		setTimeout(messageApi.destroy, 2000);
	}

	function tempSave(product) {
		addItem({ id: product.productID, ...product }, quantity);
		document.getElementById(quantityInput.current.id).defaultValue = 1;
		notify("Saved to Cart");
	}

	return (
		<Row gutter={{ xs: 0 }}>
			{contextHolder}
			{products.map((product, i) => (
				<Col className="gutter-row" span={24} key={i}>
					<Link to={`/product/${product.productID}`}>
						<Badge.Ribbon
							key={product.productID}
							color={product.inStock ? "green" : "red"}
							text={product.inStock ? "In Stock" : "Out of Stock"}
						>
							<Card
								size="small"
								hoverable
								cover={
									<img
										loading="lazy"
										src={product.imageUrl}
										alt={product.imageName}
									/>
								}
							>
								<Meta title={product.name} description={product.desc} />
								<Title level={5}>
									Brand: <Paragraph>{product.brand}</Paragraph>
								</Title>
								<QRCode value={URL + "product/" + product.productID} />
								<Divider />
								<Title level={4}>{product.conversionSize}{product.conversion.unit}</Title>
								<Title level={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{formatter.format(product.price)}</Title>
							</Card>
						</Badge.Ribbon>
					</Link>
					<div className="card-footer">
						<div className="quantity-container">
							<Tooltip title="Up and Down or Type in number (not 0)">
								<InputNumber
									id={product.productID}
									ref={quantityInput}
									min={1}
									defaultValue={1}
									onChange={onChange}
									onKeyPress={(event) => {
										if (!/[0-9]/.test(event.key)) {
											event.preventDefault();
										}
									}}
								/>
							</Tooltip>
						</div>
						<Button
							type="primary"
							size="small"
							style={{ height: "100%" }}
							onClick={() => tempSave(product)}
							disabled={product.inStock ? false : true}
						>
							Add to cart
						</Button>
					</div>
				</Col>
			))}
		</Row>
	);
}

export default React.memo(List);
