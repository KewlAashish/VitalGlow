import React from "react";

export default function ClientOverviewCard({ client }) {
  const {
    name,
    email,
    weight_kg,
    age,
    goal,
    gender,
    last_updated,
  } = client;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-zinc-900 rounded-2xl pt-6 px-6 pb-4 sm:pt-8 sm:px-8 sm:pb-5 shadow-md border border-zinc-700 text-white mb-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        {/* Left - Profile Info */}
        <div className="flex items-center gap-4">
          <div className="rounded-full w-16 h-16 bg-zinc-700 flex items-center justify-center text-3xl">
            <span className="text-white/70">👤</span>
          </div>
          <div>
            <p className="text-2xl font-semibold">{name}</p>
            <p className="text-zinc-300 text-sm truncate w-52">{email}</p>
            <p className="mt-1 text-sm">
              Gender: <span className="font-semibold">{gender}</span>
            </p>
          </div>
        </div>

        {/* Right - Metrics */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <MetricPill icon="⚖️" label="Weight" value={`${weight_kg} kg`} />
          <MetricPill icon="🎂" label="Age" value={`${age} years`} />
          <MetricPill icon="🧬" label="Gender" value={gender} />
          <MetricPill
            icon="🎯"
            label="Goal"
            value={goal}
            pillClass="bg-gradient-to-br from-green-500 to-emerald-600 text-white"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-700 my-4" />

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-zinc-300 gap-2">
        <div>
          <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-2" />
          <span className="text-white font-medium">Progress:</span>{" "}
          <span className="text-green-400 font-semibold ml-1">On Track</span>
        </div>
        {last_updated && (
          <p>
            Last updated:{" "}
            <span className="text-white">{formatDate(last_updated)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function MetricPill({ icon, label, value, pillClass = "bg-zinc-800 text-white" }) {
  return (
    <div className={`rounded-xl px-4 py-2 ${pillClass} shadow-sm`}>
      <div className="text-sm text-zinc-300 flex items-center gap-1">
        <span className="text-white/70">{icon}</span> {label}
      </div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}