import React from "react";
import { AutoComplete } from "antd";
import "@styles/searchBar.scss";

const { Option } = AutoComplete;

function SearchBar({ products, onSelect, onChange }) {
	const [options] = React.useState(products);

	return (
		<div className="search-container">
			<AutoComplete
				className="search-bar"
				dropdownMatchSelectWidth={250}
				onSelect={onSelect}
				onChange={onChange}
				placeholder="Search for products or brands"
				size="large"
				filterOption={(inputValue, option) =>
					option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
				}
				allowClear
			>
				{options.map((option) => (
					<Option key={option.productID} value={option.name}>
						{option.name}
					</Option>
				))}
			</AutoComplete>
		</div>
	);
}

export default React.memo(SearchBar);
