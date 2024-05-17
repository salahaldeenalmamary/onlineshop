import React from "react";

const AuthContext = React.createContext(null);

export const Authorize = ({ children }) => {
    const setToken = (token) => {
        localStorage.setItem("token", token);
    };

    const setId = (id) => {
        localStorage.setItem("id", id);
    };

    const setRole = (value) => {
        localStorage.setItem("role", value);
    };

    const setIsLoggedIn = (value) => {
        localStorage.setItem("isLoggedIn", value);
    };

    const getIsLoggedIn = () => {
        return localStorage.getItem("isLoggedIn");
    };

    const getRole = () => {
        return localStorage.getItem("role");
    };

    const getId = () => {
        return localStorage.getItem("id");
    };

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const removeToken = () => {
        return localStorage.removeItem("token");
    };

    const removeId = () => {
        return localStorage.removeItem("id");
    };

    const removeRole = () => {
        return localStorage.removeItem("role");
    };

    const removeIsLoggedIn = () => {
        return localStorage.removeItem("isLoggedIn");
    };

    const login = (value) => {
        setIsLoggedIn(value);
    };

    const logout = () => {
        removeToken();
        removeId();
        removeRole();
        removeIsLoggedIn();
        window.location.href = "/login";
    };

    React.useEffect(() => {
        const token = getToken();
        const id = getId();
        const role = getRole();
        const isLoggedIn = getIsLoggedIn();
        if (token !== null) {
            setToken(token);
            setId(id);
            setRole(role);
            setIsLoggedIn(isLoggedIn);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                login,
                setToken,
                getToken,
                setId,
                getId,
                setRole,
                getRole,
                setIsLoggedIn,
                getIsLoggedIn,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};