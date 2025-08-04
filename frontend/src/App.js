import React from "react";
import { BrowserRouter, Routes } from 'react-router-dom';
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";


function App() {
  return (
    <BrowserRouter>
      <PublicRoutes />  
      <PrivateRoutes />
    </BrowserRouter>
  );
}

export default App;
