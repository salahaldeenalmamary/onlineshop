import axios from "axios";

export async function GetConversions() {
    const res = await axios.get("/api/Conversion");
    const data = res.data;
    return data;
}

export async function ConversionPostRequest(myForm) {
    try {
        const res = await axios.post("/api/Conversion", myForm,
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

export async function ConversionPutRequest(myForm) {
    try {
        const id = myForm.id;
        const res = await axios.put(`/api/Conversion/${id}`, myForm,
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

export async function ConversionDeleteRequest(id) {
    const res = await axios.delete(`/api/Conversion/${id}`);
    const data = res.data;
    return data;
}