import axios from "axios";

export async function GetProductTypes() {
    const res = await axios.get("/api/ProductType");
    const data = res.data;
    return data;
}

export async function GetProductType({ queryKey }) {
    const { id } = queryKey[1];
    const res = await axios.get(`/api/ProductType/${id}`);
    const data = res.data;
    return data;
}

export async function ProductTypePostRequest(myForm) {
    try {
        const res = await axios.post("/api/ProductType", myForm, {
            headers: { "Content-Type": "application/json" },
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.error(error.response.data);
    }
}

export async function ProductTypePutRequest(myForm) {
    try {
        const id = myForm.id;
        const res = await axios.put(`/api/ProductType/${id}`, myForm, {
            headers: { "Content-Type": "application/json" },
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.error(error.response.data);
    }
}

export async function ProductTypeDeleteRequest(id) {
    const res = await axios.delete(`/api/ProductType/${id}`);
    const data = res.data;
    return data;
}