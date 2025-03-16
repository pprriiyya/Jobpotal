import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import './Login.css'; // Ensure this path is correct

const JobSeekerForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent!");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2 className="title">Job Seeker Forgot Password</h2>
            {message && <p className="error-message">{message}</p>}
            <form onSubmit={handleResetPassword} className="login-form">
                <label className="label">Email Id</label>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="input" 
                />
                <button type="submit" className="forgot-button">Reset Password</button>
            </form>
        </div>
    );
};

export default JobSeekerForgotPassword;
