import { useState } from "react";

export default function AddClientModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    goal: "",
    email: "",
    height_cm: "",
    weight_kg: "",
    gender: "",
  });

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return alert("Trainer email not found");

    const payload = { ...form, trainer_email: user.email };

    try {
      const response = await fetch(`${API_BASE}/api/trainer/client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        onAdd(result.data);
      } else {
        alert(result.message || "Error adding client.");
      }
    } catch (err) {
      console.error("Error adding client:", err);
      alert("Server error.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-zinc-900 text-white rounded-xl p-8 w-full max-w-xl shadow-2xl border border-zinc-700">
        <h2 className="text-2xl font-semibold mb-6 text-white">➕ Add New Client</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <input
              name="goal"
              placeholder="Goal"
              value={form.goal}
              onChange={handleChange}
              required
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <input
              name="height_cm"
              type="number"
              placeholder="Height (cm)"
              value={form.height_cm}
              onChange={handleChange}
              required
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <input
              name="weight_kg"
              type="number"
              placeholder="Weight (kg)"
              value={form.weight_kg}
              onChange={handleChange}
              required
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-md shadow-md transition-all"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
