// File: src/pages/LoginPage.jsx

import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-zinc-900 text-white font-sans flex flex-col lg:flex-row select-none">
      {/* Left - Info */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-zinc-900 to-black">
        <div className="flex flex-col justify-center h-full text-center lg:text-left max-w-md space-y-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-300">
            For Trainers, Powered by VitalGlow
          </h2>
          <p className="text-zinc-300 text-md sm:text-lg">
            Effortlessly manage your clients, track their progress, assign workout and nutrition plans, and grow your fitness business — all in one platform.
          </p>
          <div className="text-zinc-400 text-sm space-y-2">
            <div className="flex items-start gap-2">
              <span>👥</span>
              <span>Manage unlimited client profiles</span>
            </div>
            <div className="flex items-start gap-2">
              <span>📅</span>
              <span>Schedule and assign weekly routines</span>
            </div>
            <div className="flex items-start gap-2">
              <span>📊</span>
              <span>Monitor progress with detailed logs</span>
            </div>
            <div className="flex items-start gap-2">
              <span>📬</span>
              <span>Auto-send updates and reminders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login to VitalGlow</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-md font-medium transition-colors"
            >
              Login
            </button>
            <p className="text-sm text-zinc-400 text-center mt-4">
              Don’t have an account? <a href="/signup" className="text-violet-400 hover:underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;