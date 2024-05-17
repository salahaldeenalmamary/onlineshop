import React from "react";

export function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = React.useState(value);

	React.useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => clearTimeout(timeoutId);
	}, [value]);
	return debouncedValue;
}
