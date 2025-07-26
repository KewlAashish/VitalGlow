import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-zinc-900 text-white font-sans flex items-center justify-center">
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
        </form>
      </div>
    </div>
  );
}

export default LoginPage;