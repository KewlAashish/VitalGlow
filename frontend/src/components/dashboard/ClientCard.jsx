// src/components/ClientCard.jsx

import React from "react";

const ClientCard = ({ client, onDelete, onEdit }) => {
  return (
    <div className="shadow-md p-4 aspect-square w-56 flex flex-col justify-between border border-silver rounded-lg hover:shadow-lg transition-shadow" style={{ backgroundColor: client.color }}>
      <div>
        <h3 className="text-lg font-bold text-zinc-900">{client.name}</h3>
        <p className="text-sm text-zinc-700 font-semibold">{client.email}</p>
        <div className="mt-2 text-sm text-zinc-800 font-semibold">
          {client.age && <p>Age: {client.age}</p>}
          {client.goal && <p>Goal: {client.goal}</p>}
        </div>
      </div>
      <div className="mt-auto flex justify-end gap-4 text-sm font-medium">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(client)
          }}
          className="text-zinc-900 hover:font-bold text-sm mr-1"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(client)
          }}
          className="text-zinc-900 hover:font-bold text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
