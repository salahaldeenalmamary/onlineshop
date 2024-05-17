import axios from "axios";

export async function GetDeliveries() {
    const res = await axios.get("/api/Delivery");
    const data = res.data;
    return data;
}

export async function GetDelivery(id) {
    const res = await axios.get(`/api/Delivery/${id}`);
    const data = res.data;
    return data;
}

export async function DeliveryPostRequest(myForm) {
    try {
        const res = await axios.post("/api/Delivery", myForm,
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

export async function DeliveryPutRequest(myForm) {
    try {
        const res = await axios.put("/api/Delivery", myForm,
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

export async function DeliveryDeleteRequest(id) {
    const res = await axios.delete(`/api/Delivery/${id}`);
    const data = res.data;
    return data;
}