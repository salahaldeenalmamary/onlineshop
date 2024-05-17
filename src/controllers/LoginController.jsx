import axios from "axios";

export async function LoginRequest(myForm) {
    try {
        const res = await axios.post("/api/Auth/Login", myForm, {
            headers: { "Content-Type": "application/json" },
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.error(error.response.data);
    }
}
