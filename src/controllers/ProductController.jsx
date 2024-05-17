import axios from "axios";
import FormData from "form-data";

export async function GetProducts() {
	const res = await axios.get("/api/Product");
	const data = res.data;
	return data;
}

export async function GetProduct({ queryKey }) {
	const { id } = queryKey[1];
	const res = await axios.get(`/api/Product/${id}`);
	const data = res.data;
	return data;
}

export async function ProductPostRequest(myForm) {
	try {
		let formData = new FormData();
		Object.entries(myForm).forEach(([key, value]) => {
			formData.append(key, value);
		});
		const res = await axios.post('/api/Product', formData, {
			transformRequest: () => formData,
		});
		const data = res.data;
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function ProductPutRequest(myForm) {
	try {
		let formData = new FormData();
		Object.entries(myForm).forEach(([key, value]) => {
			formData.append(key, value);
		});
		const id = myForm.id;
		const res = await axios.put(`/api/Product/${id}`, formData, {
			transformRequest: () => formData,
		});
		const data = res.data;
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function UpdateProductStatusRequest(myForm) {
	try {
		const { id, inStock } = myForm;
		const res = await axios.put(`/api/Product/${id}/Status/${inStock}`);
		const data = res.data;
		return data;
	} catch (error) {
		console.error(error.response.data);
	}
}

export async function ProductDeleteRequest(id) {
	const res = await axios.delete(`/api/Product/${id}`);
	const data = res.data;
	return data;
}
