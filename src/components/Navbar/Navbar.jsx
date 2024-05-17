import React from "react";
import logo from "@assets/react.svg";
import {
	ShoppingCartOutlined,
	BookOutlined,
	LoginOutlined,
	BarsOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "@styles/navbar.scss";
import {
	Empty,
	Badge,
	Tooltip,
	InputNumber,
	Divider,
	Modal,
	message,
} from "antd";
import { useCart } from "react-use-cart";
import { formatter } from "@utils/CurrencyFormatter";
import { useAuth } from '@auth/Authorize';


function Navbar() {
	const {
		items,
		updateItemQuantity,
		removeItem,
		emptyCart,
		cartTotal,
		isEmpty,
	} = useCart();
	const navElement = React.useRef();
	const [messageApi, contextHolder] = message.useMessage();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const auth = useAuth();
	const navigate = useNavigate();

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

	function showModal() {
		setIsModalOpen(!isModalOpen);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	function onChange(value, item) {
		if (value < 1 || value == null) {
			value = 1;
		}
		saveItem(value, item);
	}
	function saveItem(value, item) {
		updateItemQuantity(item.productID, value);
		notify("Updated Cart");
	}

	function toggle() {
		var element = navElement.current;
		element.classList.toggle("active");
	}

	function deleteItem(item) {
		removeItem(item.productID);
		notify("Removed from Cart");
	}

	function handleOrder() {
		if (auth.getIsLoggedIn) {
			navigate("/dashboard/client", { state: { items: items } });
		} else {
			navigate("/login");
		}
	}

	const content = (
		<div>
			<button onClick={emptyCart} className="clear-cart">
				Empty Cart
			</button>
			{!isEmpty ? (
				items.map((item) => (
					<Badge.Ribbon
						key={item.productID}
						color={item.inStock ? "green" : "red"}
						text={item.inStock ? "In Stock" : "Out of Stock"}
					>
						<div key={item.productID} className="cart-item" id="cart-item">
							<img loading="lazy" src={item.imageUrl} alt={item.imageName} />
							<div className="cart-body">
								<h3>{item.name}</h3>
								<small>{item.brand}</small>
								<h4>{item.conversionSize}{item.conversion.unit}</h4>
							</div>
							<div className="cart-footer">
								<h5>Quantity: {item.quantity}</h5>
								<h5>Price: {formatter.format(item.price)}</h5>
								<h4>Total: {formatter.format(item.itemTotal)}</h4>
							</div>
							{item.inStock ? (
								<div className="quantity-container">
									<Tooltip title="Up and Down or Type in number (not 0)">
										<InputNumber
											value={item.quantity}
											min={1}
											defaultValue={item.quantity}
											onChange={(value) => onChange(value, item)}
											onKeyPress={(event) => {
												if (!/[0-9]/.test(event.key)) {
													event.preventDefault();
												}
											}}
										/>
									</Tooltip>
								</div>
							) : null}
							<div className="cart-button">
								<button onClick={() => deleteItem(item)}>X</button>
							</div>
						</div>
					</Badge.Ribbon>
				))
			) : (
				<Empty />
			)}
			<Divider>Cart Total</Divider>
			<h4 style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
				{formatter.format(cartTotal)}
			</h4>
		</div>
	);

	return (
		<>
			{contextHolder}
			<Modal
				title="My Cart"
				open={isModalOpen}
				footer={[
					<button
						key="modal-cart-button1"
						disabled={isEmpty}
						className="order-now"
						onClick={handleOrder}
					>
						Order Now
					</button>,
					<button
						key="modal-cart-button2"
						style={{
							border: "1px solid lightgrey",
							borderRadius: "10px",
							background: "none",
							transition: "0.3s ease",
							fontWeight: 500,
							marginLeft: "10px",
							cursor: "pointer",
						}}
						onClick={closeModal}
					>
						Close
					</button>,
				]}
			>
				{content}
			</Modal>
			<nav className="nav">
				<div className="nav-logo">
					<img loading="lazy" src={logo} alt="logo" />
					<h3>EthernAI Store</h3>
				</div>
				<ul className="nav-links" ref={navElement}>
					<li>
						<div className="nav-container">
							<Link to="/">
								<BookOutlined className="icon" />
								<small>Products</small>
							</Link>
						</div>
					</li>
					<li>
						<div className="nav-container">
							<Link to="/login" target="_blank" rel="noopener noreferrer">
								<LoginOutlined className="icon" />
								<small>Login</small>
							</Link>
						</div>
					</li>
					<li>
						<div className="nav-container">
							<a className="cart-icon" onMouseOver={showModal}>
								<ShoppingCartOutlined className="icon" />
								<small>Cart</small>
							</a>
						</div>
					</li>
				</ul>
				<div className="toggle">
					<BarsOutlined className="icon" onClick={toggle} />
				</div>
			</nav>
		</>
	);
}

export default React.memo(Navbar);
