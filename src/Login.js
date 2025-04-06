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
            navigate("AdminDashboard");
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
            <a href="/">Admin</a>

          </ul>
        </nav>
      </header>

            <table>
                <tr>
                    <td>
                        <div className="login-container">
                            
                           
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
                            
                                <>
                                
                                </>
                            
                        </div>
                    </td>
                </tr>
            </table>
             {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="Home">Home</a> <br /> <hr />
            <a href="About">About Us</a><br /> <hr />
            <a href="JobseekerLogin">Signup for Jobs</a> <br /> <hr />
            <a href="EmployeeLogin">Signup for Employer</a><br /> <hr />
            <a href="ContactUs">Contact Us</a><br /><hr />
            <a href="JobListings">Job Listings</a><br /> <hr />
            
            <a href="/">Admin</a>
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
        </div>
      </footer>
        </div>
    );
};

export default Login;
