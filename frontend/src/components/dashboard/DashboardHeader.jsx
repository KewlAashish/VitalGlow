import React from "react";
import { Plus, LogOut } from "lucide-react";

export default function DashboardHeader({ onAddClick, onLogoutClick }) {
  return (
    <div className="flex justify-between items-center mb-6 p-6 text-white bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-900" style={{ borderBottom: "1px solid silver" }}>
      <h1 className="text-2xl font-bold">Trainer Dashboard</h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 bg-white text-black px-3 py-2 rounded hover:bg-gray-200 transition-all"
        >
          {/* Show icon always */}
          <Plus className="h-5 w-5" />

          {/* Show label only on sm and above */}
          <span className="hidden sm:inline">Add Client</span>
        </button>
        <button
          onClick={onLogoutClick}
          className="flex items-center justify-center gap-2 bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}