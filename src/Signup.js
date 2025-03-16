// Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'; // Use the same CSS file as the login page

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password); 
      navigate("/login"); // Redirect to the login page after successful signup
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
              <h2 className="title">Signup</h2>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSignup} className="login-form">
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
                <button type="submit" className="login-button">Signup</button>
              </form>
              <p className="link-text">Already have an account? <Link to="/" className="signup-link">Login here</Link></p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Signup;
