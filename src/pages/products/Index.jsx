import React from "react";
import { Layout, Typography, Empty } from "antd";
import { debounce } from "lodash";
import { useQuery } from "react-query";
import "@styles/products.scss";

const List = React.lazy(() => import("@pages/products/List"));
const SearchBar = React.lazy(() => import("@components/Search/SearchBar"));

import { GetProducts } from "@controllers/ProductController";

const { Header, Content } = Layout;
const { Title } = Typography;

function Products() {
	const { data: products, isLoading } = useQuery(["product"], GetProducts);
	const [results, setResults] = React.useState([]);

	const onSelect = (value) => {
		setResults(
			products.filter(
				(product) =>
					product.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
			)
		);
	};

	const logValue = debounce((value) => {
		setResults(
			products.filter(
				(product) =>
					product.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
					product.brand.toLowerCase().indexOf(value.toLowerCase()) !== -1
			)
		);
	}, 1000);

	const onChange = (value) => {
		logValue(value);
	};

	React.useEffect(() => {
		if (!isLoading) setResults(products);
	}, [products]);

	if (isLoading && !!results) return <Empty />;

	return (
		<Layout>
			<Header>
				<Title level={4}>Hey 😉, Begin your Shopping</Title>
				<SearchBar
					products={products}
					onSelect={onSelect}
					onChange={onChange}
				/>
			</Header>
			<Content>
				<Title level={5}>Shop Now</Title>
				<List products={results} />
			</Content>
		</Layout>
	);
}

export default Products;
