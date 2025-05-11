import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
