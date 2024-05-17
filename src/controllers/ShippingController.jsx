import axios from "axios";

export async function GetShippings() {
    const res = await axios.get("/api/Shipping");
    const data = res.data;
    return data;
}

export async function GetShipping(id) {
    const res = await axios.get(`/api/Shipping/${id}`);
    const data = res.data;
    return data;
}


export async function ShippingPostRequest(myForm) {
    try {
        const res = await axios.post("/api/Shipping", myForm,
            {
                headers: { "Content-Type": "application/json" }
            });
        const data = res.data;
        return data;
    }
    catch (error) {
        console.error(error.response.data);
    }
}

export async function ShippingPutRequest(myForm) {
    try {
        const id = myForm.id;
        const res = await axios.put(`/api/Shipping/${id}`, myForm,
            {
                headers: { "Content-Type": "application/json" }
            });
        const data = res.data;
        return data;
    }
    catch (error) {
        console.error(error.response.data);
    }
}

export async function ShippingDeleteRequest(id) {
    const res = await axios.delete(`/api/Shipping/${id}`);
    const data = res.data;
    return data;
}