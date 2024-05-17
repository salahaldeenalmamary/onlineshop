import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
	Empty,
	QRCode,
	Divider,
	Badge,
	Tooltip,
	InputNumber,
	message,
	Button,
	Layout,
} from "antd";
import { formatter } from "@utils/CurrencyFormatter";
import { useCart } from "react-use-cart";
import "@styles/product.scss";

import { GetProduct } from "@controllers/ProductController";
const { Content } = Layout;

function Product() {
	const { id } = useParams();
	const { data: product, isLoading } = useQuery(["product", { id }], GetProduct);

	const { addItem } = useCart();
	const [quantity, setQuantity] = React.useState(1);
	const [messageApi, contextHolder] = message.useMessage();

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
		notify("Saved Successfully");
	}

	if (isLoading) return <Empty />;

	return (
		<Layout>
			<Content>
				<div className="product-container">
					{contextHolder}
					<div className="product-header">
						<span>{product.name}</span>by
						<small>
							<b>{product.brand}</b>
						</small>
					</div>
					<Badge.Ribbon
						color={product.inStock ? "green" : "red"}
						text={product.inStock ? "In Stock" : "Out of Stock"}
					>
						<div className="product-body">
							<img
								loading="lazy"
								src={product.imageUrl}
								alt={product.imageName}
							/>
							<div>
								<QRCode value={product.productID} />
							</div>
						</div>
					</Badge.Ribbon>
					<Divider />
					<h4>{product.conversionSize}{product.conversion.unit}</h4>
					<h3>{formatter.format(product.price)}</h3>
					<div className="product-body-quantity">
						<div className="quantity-container">
							<Tooltip title="Up and Down or Type in number (not 0)">
								<InputNumber
									id={product.productID}
									key={product.productID}
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
							<Button
								key={product.productID}
								type="primary"
								size="small"
								style={{ height: "100%" }}
								onClick={() => tempSave(product)}
								disabled={product.inStock ? false : true}
							>
								Add to cart
							</Button>
						</div>
					</div>
					<Divider>
						<div
							style={{
								border: "1px solid lightgray",
								borderRadius: "10px",
								padding: "10px",
							}}
						>
							Description
						</div>
					</Divider>
					<div>
						<p>{product.desc}</p>
					</div>
				</div>
			</Content>
		</Layout>
	);
}

export default React.memo(Product);
