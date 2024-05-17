import axios from "axios";

export async function GetOrders() {
    const res = await axios.get("/api/Order");
    const data = res.data;
    return data;
}

export async function GetOrder(id) {
    const res = await axios.get(`/api/Order/${id}`);
    const data = res.data;
    return data;
}

export async function OrderPostRequest(myForm) {
    try {
        const res = await axios.post("/api/Order", myForm,
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

export async function OrderPutRequest(myForm) {
    try {
        const id = myForm.id;
        const res = await axios.put(`/api/Order/${id}`, myForm,
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

export async function OrderDeleteRequest(id) {
    const res = await axios.delete(`/api/Order/${id}`);
    const data = res.data;
    return data;
}