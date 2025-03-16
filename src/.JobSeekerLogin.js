import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const JobSeekerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail(""); // Clear form after successful login
            setPassword("");
            navigate("/JobApplicationForm"); // Redirect job seeker to dashboard
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="title">Job Seeker Login</h2>
                {error && <p className="error-message">{error}</p>}
                
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="label">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="extra-links">
                    <button onClick={() => navigate("/JobSeekersSignUp")} className="signup-button">Sign Up</button>
                    <button onClick={() => navigate("/JobSeekerForgotPassword")} className="forgot-button">Forgot Password?</button>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerLogin;
