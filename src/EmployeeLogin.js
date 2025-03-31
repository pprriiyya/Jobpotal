import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure this file contains appropriate styling

const EmployerLogin = () => {
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
            navigate("/EmployerDashboard"); // Redirect employer to dashboard
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="login-page">
                <header className="navbar">
        <div className="logo">
          <img src="logo for job portal.png" alt="Job Portal" />
          <h1>Job Portal</h1>
        </div>
        <nav>
          <ul className="nav-links">
           
            <a href="Home">Home</a> 
            <a href="About">About Us</a>
            <a href="JobseekerLogin">SignupforJobs </a> 
            <a href="EmployeeLogin">SignupforEmployer</a>
            <a href="ContactUs">ContactUs</a>
            <a href="JobListings">Job Listings</a>
            <a href="Review">Reviews</a>
            <a href="/">Sign In</a>

          </ul>
        </nav>
      </header>
            <div className="login-container">
                <h2 className="title">Employer Login</h2>
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
                    <button onClick={() => navigate("/EmployerSignUp")} className="signup-button">Sign Up</button>
                    <button onClick={() => navigate("/EmployeeForgotPassword")} className="forgot-button">Forgot Password?</button>
                </div>
            </div>
            <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="Home">Home</a> <br /> <hr />
            <a href="About">About Us</a><br /> <hr />
            <a href="JobseekerLogin">SignupforJobs </a> <br /> <hr />
            <a href="EmployeeLogin">SignupforEmployer</a><br /> <hr />
            <a href="ContactUs">ContactUs</a><br /><hr />
            <a href="JobListings">Job Listings</a><br /> <hr />
            <a href="Review">Reviews</a><br /> <hr />
            <a href="/">Sign In</a>
          </div>

          <div className="footer-quote">
            <p>
              "Your work is going to fill a large part of your life, and the only way 
              to be truly satisfied is to do what you believe is great work. 
              The only way to do great work is to love what you do. If you haven't found it yet, 
              keep looking. Don't settle."
            </p>
          </div>

          <div className="social-links">
            <p>SOCIAL LINKS</p>
            <a href="https://www.instagram.com/accounts/login/?hl=en" target="_blank" rel="noopener noreferrer">
              <img src="Instagram.jpg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src="Facebook.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer">
              <img src="download.png" alt="Twitter" />
            </a>
          </div>
          <br />
        </div>
      </footer>
        </div>
    );
};

export default EmployerLogin;
