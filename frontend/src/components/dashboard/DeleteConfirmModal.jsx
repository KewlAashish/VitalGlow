// src/components/dashboard/DeleteConfirmModal.jsx
import React from "react";

export default function DeleteConfirmModal({ clientName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-zinc-900 text-white p-8 rounded-xl max-w-md w-full border border-zinc-700 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">⚠️ Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete <span className="font-bold text-red-400">{clientName}</span>?
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn-primary bg-red-600 hover:bg-red-500" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
