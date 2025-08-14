import React, { useState, useEffect } from "react";
import {
  format,
  addWeeks,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import {
  FaDumbbell,
  FaUtensils,
  FaWeight,
  FaPen,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function WeeklyTable({ clientId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [weeklyLogs, setWeeklyLogs] = useState({});

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    setWeekDates(dates);
    fetchLogs(start);
  }, [currentDate]);

  const fetchLogs = async (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    try {
      const res = await fetch(
        `${API_BASE}/api/client/logs/${clientId}/${dateStr}`
      );
      const data = await res.json();
      if (res.ok && data?.data) {
        const logs = {};
        data.data.forEach((entry) => {
          const entryDate = entry.date;
          logs[entryDate] = entry.data;
        });
        setWeeklyLogs(logs);
      }
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  const handleWeekChange = (direction) => {
    setCurrentDate((prev) => addWeeks(prev, direction));
  };

  const renderWorkouts = (log) => {
    if (!log?.training_logs?.length)
      return <span className="text-zinc-400">+ No workouts</span>;
    return (
      <div>
        <div className="text-purple-300 flex items-center gap-1">
          <FaDumbbell />
          {log.training_logs.length} workout
          {log.training_logs.length > 1 && "s"}
        </div>
        <ul className="text-sm text-zinc-300 mt-1">
          {log.training_logs.map((w, i) => (
            <li key={i}>
              <span className="font-semibold">{w.type}</span>
              {w.exercises?.length > 0 &&
                ": " +
                  w.exercises
                    .map((e) => `${e.name} - ${e.sets || 1}x${e.reps || 1}`)
                    .join(", ")}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMeals = (log) => {
    if (!log?.nutrition_logs?.length)
      return <span className="text-zinc-400">+ No meals logged</span>;
    return (
      <div>
        <div className="text-green-300 flex items-center gap-1">
          <FaUtensils />
          {log.nutrition_logs.length} meal
          {log.nutrition_logs.length > 1 && "s"}
        </div>
        <ul className="text-sm text-zinc-300 mt-1">
          {log.nutrition_logs.map((m, i) => {
            const totalCalories = m.items?.reduce(
              (sum, item) => sum + (item.calories || 0),
              0
            );
            return (
              <li key={i}>
                <span className="font-semibold">{m.meal}</span>: {totalCalories} cal
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl shadow-xl text-white mt-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Weekly Progress</h2>
        <div className="flex items-center gap-4 text-white">
          <button onClick={() => handleWeekChange(-1)} className="hover:text-purple-400">
            <FaChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium text-zinc-300">
            {format(startOfWeek(currentDate, { weekStartsOn: 1 }), "MMM d")} -
            {format(endOfWeek(currentDate, { weekStartsOn: 1 }), "MMM d")}
          </span>
          <button onClick={() => handleWeekChange(1)} className="hover:text-purple-400">
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="min-w-[720px]">
        <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-zinc-600 text-sm font-semibold text-zinc-200">
          <span>Day</span>
          <span>Workouts</span>
          <span>Meals</span>
          <span>Weight</span>
          <span className="text-right">Actions</span>
        </div>
        {weekDates.map((date) => {
          const key = format(date, "yyyy-MM-dd");
          const log = weeklyLogs?.[key];
          return (
            <div
              key={key}
              className="grid grid-cols-5 gap-4 px-4 py-4 border-b border-zinc-800 text-sm min-w-full"
            >
              <div>
                <div className="font-semibold text-white text-sm sm:text-base">
                  {format(date, "EEEE")}
                </div>
                <div className="text-xs font-semibold text-zinc-400">
                  {format(date, "MMM d")}
                </div>
              </div>
              <div>{renderWorkouts(log)}</div>
              <div>{renderMeals(log)}</div>
              <div className="text-white flex items-center gap-1">
                {log?.weight_kg ? (
                  <>
                    <FaWeight className="text-purple-300" /> {log.weight_kg} kg
                  </>
                ) : (
                  <span className="text-zinc-400">Not recorded</span>
                )}
              </div>
              <div className="flex justify-end items-center">
                <div className="w-7 h-7 bg-zinc-800 hover:bg-purple-900/60 text-zinc-400 hover:text-purple-300 rounded-md flex justify-center items-center cursor-pointer">
                  <FaPen size={12} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
