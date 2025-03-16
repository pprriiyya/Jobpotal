import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in or not
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            navigate("/"); // Redirect to login page after logout
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
                            {!isLoggedIn ? (
                                <>
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
                                    <button onClick={() => navigate("/ForgotPassword")} className="forgot-button">Forgot Password</button>
                                </>
                            ) : (
                                <>
                                    <h2 className="title">Welcome Back!</h2>
                                    <p>You are logged in.</p>
                                    <button onClick={handleLogout} className="logout-button">Logout</button>
                                </>
                            )}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Login;
