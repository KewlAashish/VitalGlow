import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-zinc-900 text-white font-sans">
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 px-8 border-b border-zinc-800">
        <h1 className="text-2xl font-bold tracking-wide text-center sm:text-left mb-4 sm:mb-0">VitalGlow</h1>
        <div className="flex flex-row justify-center sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
          <Link to="/login">
            <button className="text-white px-4 py-2 text-sm sm:text-base rounded-md border border-zinc-600 hover:bg-zinc-800">Login</button>
          </Link>
          <Link to="/signup">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 text-sm sm:text-base rounded-md">Get Started</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 md:px-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Glow into Your Best Self with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-300">VitalGlow</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          The ultimate AI-fueled space for trainers and fitness enthusiasts to connect, build plans, and shine.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <button className="bg-violet-600 hover:bg-violet-500 px-6 py-3 text-white rounded-md font-medium">Join as a Trainer</button>
            </Link>
            <Link to="/signup">
              <button className="border border-zinc-500 hover:border-white px-6 py-3 text-white rounded-md font-medium">Start Your Journey</button>
            </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-16 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Client Management",
            "AI Plan Generation",
            "Fitness Challenges",
            "Find a Trainer",
            "Track Your Progress"
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-800 hover:bg-zinc-700 transition rounded-xl p-6 shadow-md text-center"
            >
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p className="text-zinc-400 text-sm">
                {feature === "Client Management" && "Effortlessly manage profiles, progress, and plans."}
                {feature === "AI Plan Generation" && "Personalized AI workout & nutrition plans."}
                {feature === "Fitness Challenges" && "Create engaging community challenges."}
                {feature === "Find a Trainer" && "Match with expert trainers for your goals."}
                {feature === "Track Your Progress" && "Log and monitor workouts and health."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-zinc-500 text-sm border-t border-zinc-800 py-6 mt-8">
        &copy; 2025 VitalGlow. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;