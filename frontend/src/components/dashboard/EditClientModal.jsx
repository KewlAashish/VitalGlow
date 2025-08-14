import { useState, useEffect } from "react";

export default function EditClientModal({ client, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...client });
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
      const response = await fetch(`${API_BASE}/api/trainer/client/${client.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        onUpdate(result.data);
        onClose();
      } else {
        alert(result.message || "Failed to update client.");
      }
    } catch (err) {
      console.error("Error updating client:", err);
      alert("Server error.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-zinc-900 text-white rounded-xl p-8 w-full max-w-xl shadow-2xl border border-zinc-700">
        <h2 className="text-xl font-semibold mb-6">🛠 Edit Client</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="input-dark" />
            <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" required className="input-dark" />
            <input name="goal" value={form.goal} onChange={handleChange} placeholder="Goal" required className="input-dark" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="input-dark" />
            <input name="height_cm" value={form.height_cm} onChange={handleChange} placeholder="Height (cm)" type="number" required className="input-dark" />
            <input name="weight_kg" value={form.weight_kg} onChange={handleChange} placeholder="Weight (kg)" type="number" required className="input-dark" />
            <select name="gender" value={form.gender} onChange={handleChange} required className="input-dark col-span-full">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button onClick={onClose} type="button" className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
