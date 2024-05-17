import axios from "axios";

export async function GetCustomers() {
    const res = await axios.get("/api/Customer");
    const data = res.data;
    return data;
}

export async function GetCustomer(id) {
    const res = await axios.get(`/api/Customer/${id}`);
    const data = res.data;
    return data;
}

export async function CustomerPostRequest(myForm) {
    try {
        const res = await axios.post(`/api/Customer`, myForm,
            {
                headers: { "Content-Type": "application/json" }
            });
        const data = res.data;
        return data;
    } catch (error) {
        console.error(error.response.data);
    }
}

export async function CustomerPutRequest(myForm) {
    try {
        const id = myForm.id;
        const res = await axios.put(`/api/Customer/${id}`, myForm,
            {
                headers: { "Content-Type": "application/json" }
            });
        const data = res.data;
        return data;
    } catch (error) {
        console.error(error.response.data);
    }
}

export async function UpdateCustomerStatusRequest(myForm) {
    try {
        const { id, status } = myForm;
        const res = await axios.put(`/api/Customer/${id}/Status/${status}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.error(error.response.data);
    }
}

export async function DeleteCustomerRequest(id) {
    const res = await axios.delete(`/api/Customer/${id}`);
    const data = res.data;
    return data;
}