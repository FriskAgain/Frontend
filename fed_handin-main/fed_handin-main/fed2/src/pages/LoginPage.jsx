import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loginUser} = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    async function handleSubmit(event){
        event.preventDefault();

        try{
            await loginUser(email, password);
        } catch(error){
            setError("Login failed. Tjek email og password.");
        }
    }

    return (
        <main className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type="submit">Log in</button>
            </form>
        </main>
    )
}