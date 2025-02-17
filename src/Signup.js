// Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
<br />

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true); // Start loading spinner
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect after successful signup
    } catch (error) {
      setError(error.message);
    }
    setLoading(false); // Stop loading spinner
  };
  

  return (
    <table border="1" width="50%" height="50%"  align="center" cellSpacing={"130px"}  margintop="20px" cellPadding={"10px"} border-collapse="collapse"  >
        <tr>
          <td>
     
    <div className="flex flex-col items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-600 mb-4" >Sign Up</h2>
      {error && <p className="text-red-500 bg-red-100 p-2 rounded-lg">{error}</p>}
      <form onSubmit={handleSignup} className="flex flex-col gap-4 mt-4 w-full max-w-md">

      <p style={{ color: "black", fontWeight: "bold" , fontSize: "20px", marginBottom: "10px", color: "red"}}>Email Id</p>
        
        <input
          id ="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <br />
        <p style={{ color: "black", fontWeight: "bold" , fontSize: "20px", marginBottom: "10px", color: "red"}}>Password</p>
        <input
          id="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <br />  
        <br />
        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/" className="text-blue-500 hover:underline">Login</a>
      </p>
    </div>

          </td>
        </tr>
      </table>
  );
};

export default Signup;
