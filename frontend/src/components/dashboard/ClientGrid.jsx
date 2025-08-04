import React, { useMemo } from "react";
import ClientCard from "./ClientCard";
import { useNavigate } from "react-router-dom";

function assignClientColors(clients) {
  const colors = ["#B4E50D", "#4DFFBE", "#FDFFB8", "#EA5B6F", "#B13BFF", "#FF7D29", "#ff4860ff"];
  const shuffled = [...colors].sort(() => Math.random() - 0.5);

  let assignedColors = [];
  let lastColor = null;

  for (let i = 0; i < clients.length; i++) {
    let available = shuffled.filter((color) => color !== lastColor);
    let color = available[Math.floor(Math.random() * available.length)];
    assignedColors.push({ ...clients[i], color });
    lastColor = color;
  }

  return assignedColors;
}

export default function ClientGrid({ clients, onEdit, onDeleteRequest }) {
  const coloredClients = useMemo(() => assignClientColors(clients), [clients]);
  const navigate = useNavigate();

  const handleCardClick = (clientId) => {
    navigate(`/client/${clientId}`);
  }

  return (
    <div className="flex flex-wrap gap-6 p-4 justify-center sm:justify-start">
      {coloredClients.map((client) => (
        <div 
          key ={client.id}
          onClick={() => handleCardClick(client.id)}
          className="cursor-pointer hover:scale-[1.05] transition-transform duration-200 ease-in-out"  
        >
        <ClientCard 
          client={client} 
          onEdit={onEdit}
          onDelete={onDeleteRequest}
        />
        </div>
      ))}
    </div>
  );
}