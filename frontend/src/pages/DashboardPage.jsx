import React, { useEffect, useState } from "react";
import AddClientModal from "../components/dashboard/AddClientModal";
import ClientCard from "../components/dashboard/ClientCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SummaryBar from "../components/dashboard/SummaryBar";
import SearchBar from "../components/dashboard/SearchBar";
import ClientGrid from "../components/dashboard/ClientGrid";
import EditClientModal from "../components/dashboard/EditClientModal";
import DeleteConfirmModal from "../components/dashboard/DeleteConfirmModal";

export default function DashboardPage() {
  const [clients, setClients] = useState(undefined); // undefined = loading
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [deleteClient, setDeleteClient] = useState(null);

  const handleClientUpdate = (updatedClient) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === updatedClient.client_id ? { ...client, ...updatedClient } : client
      )
    );
    setEditClient(null);  
  }

  const fetchTrainerSummary = async (email) => {
    console.log("Fetching trainer summary for email:", email);
    try {
      const response = await fetch(`http://localhost:5000/api/trainer/summary/${email}`);
      const result = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch trainer summary:", result.message);
        return [];
      }

      const clientSummary = result?.data?.client_summary || {};
      const clients = Object.entries(clientSummary).map(([id, data]) => ({
        id,
        ...data
      }));

      console.log("Fetched clients:", clients);

      return clients;
    } catch (error) {
      console.error("Error fetching trainer summary:", error);
      return [];
    }
  };

  const handleAddClient = (newClient) => {
    setClients((prev) => [...prev, newClient]);
    setShowAddClientModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/trainer/client/${deleteClient.id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        setClients((prev) => prev.filter((client) => client.id !== deleteClient.id));
        setDeleteClient(null);
      } else {
        alert(result.message || "Failed to delete client.");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Server error while deleting client.");
    }
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const email = storedUser?.email;

    if (!email) {
      console.error("Trainer email not found in localStorage.");
      setClients([]); // fallback
      return;
    }

    fetchTrainerSummary(email).then(setClients);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-900 text-gray-900">
      <DashboardHeader
        onAddClick={() => setShowAddClientModal(true)}
        onLogoutClick={handleLogout}
      />
      {/* Optional UI components */}
      {/* <SummaryBar count={clients?.length || 0} /> */}
      {/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}

      {showAddClientModal && (
        <AddClientModal
          onClose={() => setShowAddClientModal(false)}
          onAdd={handleAddClient}
        />
      )}

      {editClient && (
        <EditClientModal
          client={editClient}
          onClose={() => setEditClient(null)}
          onUpdate={handleClientUpdate}
        />
      )}

      {deleteClient && (
        <DeleteConfirmModal
          clientName={deleteClient.name}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setDeleteClient(null)}
        />
      )}

      {clients === undefined ? (
        <div className="text-center text-gray-400 py-8">Loading clients...</div>
      ) : (
        <ClientGrid clients={clients} onEdit={(client) => setEditClient(client)} onDeleteRequest={(client) => setDeleteClient(client)}/>
      )}
    </div>
  );
}
