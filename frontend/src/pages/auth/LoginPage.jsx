// File: src/pages/auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");   
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setMessage("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setMessage(data.error || "❌ Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-zinc-900 text-white font-sans flex flex-col lg:flex-row select-none">
      {/* Left - Info */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-zinc-900 to-black">
        <div className="flex flex-col justify-center h-full text-center lg:text-left max-w-md space-y-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-300 leading-none mb-4 pb-2">
            Welcome Back <br /> Trainer!
          </h2>
          <p className="text-zinc-300 text-md sm:text-lg">
            Log in to continue managing your clients, plans, and scaling your fitness business on VitalGlow.
          </p>
          <div className="text-zinc-400 text-sm space-y-2">
            <div className="flex items-start gap-2">👥 Manage unlimited client profiles</div>
            <div className="flex items-start gap-2">📅 Schedule and assign weekly routines</div>
            <div className="flex items-start gap-2">📊 Monitor progress with detailed logs</div>
            <div className="flex items-start gap-2">📬 Auto-send updates and reminders</div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login to VitalGlow</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-md font-medium transition-colors"
            >
              Login
            </button>

            {/* Show message */}
            {message && (
              <p className="text-center text-sm mt-2 text-zinc-300">{message}</p>
            )}

            <p className="text-sm text-zinc-400 text-center mt-4">
              Don’t have an account? <a href="/signup" className="text-violet-400 hover:underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;