import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search clients..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 mb-6 rounded bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-violet-500"
    />
  );
}