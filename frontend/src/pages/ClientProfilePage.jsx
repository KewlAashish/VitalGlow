import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientOverviewCard from "../components/clientProfile/ClientOverviewCard";
import WeeklyTable from "../components/clientProfile/WeeklyTable";

export default function ClientProfilePage() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
    const fetchClientInfo = async () => {
        try {
        const res = await fetch(`${API_BASE}/api/trainer/client/${clientId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch client data");
        setClientData(data.data);
        console.log("Fetched successfully.");
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };

    fetchClientInfo();
    }, [clientId]);



  const handleBack = () => navigate("/dashboard");

  // 💡 Modular UI renderers
  const renderHeader = () => (
    <div className="p-4 text-white flex items-center justify-between">
      <button onClick={handleBack} className="text-lg text-purple-400 hover:text-purple-300 font-bold size-22">
        ← Back to Dashboard
      </button>
    </div>
  );

  const renderContent = () => {
    if (loading) return <p className="text-gray-400 text-center mt-10">Loading client info...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
    if (!clientData) return <p className="text-gray-500 text-center mt-10">No client data found.</p>;

    return (
      <div className="px-6 sm:px-12">
        {/* Placeholder components for now */}
        <ClientOverviewCard client={clientData} />
        <WeeklyTable clientId={clientId} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      {renderHeader()}
      {renderContent()}
    </div>
  );
}
