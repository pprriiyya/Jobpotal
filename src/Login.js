// Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import './Login.css';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="table-container">
            <table>
                <tr>
                    <td>
                        <div className="login-container">
                            <h2 className="title">Login</h2>
                            {error && <p className="error-message">{error}</p>}
                            <form onSubmit={handleLogin} className="login-form">
                                <label className="label">Email Id</label>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="input" 
                                />
                                <label className="label">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="input" 
                                />
                                <button type="submit" className="login-button">Login</button>
                            </form>
                            <button onClick={() => navigate("/signup")} className="signup-button">Signup</button>
                            <br />
                            <button onClick={( ) => navigate("/ForgotPassword")} className="forgot-button">Forgot Password</button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Login;
