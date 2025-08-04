import React from "react";

export default function SummaryBar({ count }) {
  return (
    <div className="text-lg text-zinc-300 mb-4">
      {count > 0 ? `You have ${count} client${count > 1 ? "s" : ""}` : "No clients added yet."}
    </div>
  );
}