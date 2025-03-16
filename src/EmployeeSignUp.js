import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure your CSS file has styles for this page

const EmployerSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail(""); // Clear form after successful sign-up
            setPassword("");
            setConfirmPassword("");
            navigate("/EmployerLogin"); // Redirect to login page after successful sign-up
        } catch (error) {
            setError(error.message); // Set error message from Firebase
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2 className="title">Employer Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                
                <form onSubmit={handleSignUp} className="signup-form">
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>

                <div className="extra-links">
                    <button onClick={() => navigate("/EmployeeLogin")} className="login-button">
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployerSignUp;
