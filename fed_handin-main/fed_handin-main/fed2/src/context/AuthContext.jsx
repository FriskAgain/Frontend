import { createContext, useContext, useState } from "react";
import { login } from "../Api/client";

const AuthContext = createContext(null);

function decodeJwt(token){
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

export function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [email, setEmail] = useState(localStorage.getItem("email"));

    async function loginUser(email, password) {
        const token = await login(email, password);
        const payload = decodeJwt(token);
        const userEmail = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const modelId = payload.ModelId;

        localStorage.setItem("token", token);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("role", role);
        if (modelId && modelId !== "-1") {
            localStorage.setItem("modelId", modelId);
        } else {
            localStorage.removeItem("modelId");
        }

        setToken(token);  
        setEmail(userEmail);
        console.log(payload);
        console.log(userEmail); 
        
        return {
            token,
            email: userEmail,
            role,
            modelId,
        };
    }

    function logout() {
        localStorage.clear();
        setToken(null);
        setEmail(null);
    }

    const value = {
        token,
        email,
        isAuthenticated: Boolean(token),
        loginUser,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}