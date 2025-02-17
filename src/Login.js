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
    <table border="1" width="50%" height="50%"  align="center" cellSpacing={"110px"}  margintop="20px" cellPadding={"10px"} border-collapse="collapse"  >
        <tr>
          <td>
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Login</h2>
      <br />
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
        <p style ={{ textAlign: "left"  , color: 'red'  , fontSize: '20px'}}> Email Id</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <br />
        <p style ={{ textAlign: "left"  , color: 'red'  , fontSize: '20px'}}> Password</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <br />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
      <button onClick={() => navigate("/signup")} className="bg-red-500 text-white p-2 mt-4">Signup</button>

    </div>
    </td>
    </tr>

    </table>
  );
};

export default Login;
