import axios from "axios";

export async function GetRoles() {
    const res = await axios.get("/api/Roles");
    const data = res.data;
    return data;
}

export async function GetRole(id) {
    const res = await axios.get(`/api/Roles/${id}`);
    const data = res.data;
    return data;
}

export async function RolePostRequest(myForm) {
    try {
        const res = await axios.post("/api/Roles", myForm,
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

export async function RolePutRequest(myForm) {
    try {
        const id = myForm.id;
        const res = await axios.put(`/api/Roles/${id}`, myForm,
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

export async function RoleDeleteRequest(id) {
    const res = await axios.delete(`/api/Roles/${id}`);
    const data = res.data;
    return data;
}
